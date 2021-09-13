const functions = require("firebase-functions");
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const admin = require("firebase-admin");
admin.initializeApp();

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", functions.config().clarifai.key);

exports.classifyUpload = functions.storage
    .object()
    .onFinalize(async (object) => {
      const storageRef = admin.storage().bucket(object.bucket);
      const fileName = object.name;
      const file = storageRef.file(fileName);
      const metadata = object.metadata;
      try {
        const url = await file.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
        await getImageConcept(url, storageRef, fileName, metadata.imageName);
      } catch (error) {
        await
        classificationFailedMetadataUpdate(
            storageRef, fileName, metadata.imageName);
      }
      return;
    });

/**
 * @param {string} url
 * @param {Bucket} storageRef
 * @param {string} fileName
 *  @param {string} imageName
 */
async function getImageConcept(url, storageRef, fileName, imageName) {
  // eslint-disable-next-line new-cap
  stub.PostModelOutputs(
      {
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        inputs: [{data: {image: {url: url}}}],
      },
      metadata,
      async (err, response) => {
        if (err || response.status.code !== 10000) {
          functions.logger.log(err || response.text);
          await
          classificationFailedMetadataUpdate(storageRef, fileName, imageName);
          return;
        }

        let final = [];
        for (const c of response.outputs[0].data.concepts) {
          if (c.value >= 0.9) {
            final.push(c.name);
          }
        }
        final = final.toString();
        const metadata = {
          metadata: {
            imageName: imageName,
            classification_status: 1,
            classifications: final,
          },
        };
        await updateFileMetadata(storageRef, fileName, metadata);
        return;
      },
  );
}

/**
 * @param {Bucket} storageRef
 * @param {string} fileName
 * @param {string} imageName
 */
async function
classificationFailedMetadataUpdate(storageRef, fileName, imageName) {
  try {
    const metadata = {
      metadata: {
        imageName: imageName,
        classification_status: 2,
      },
    };
    await updateFileMetadata(storageRef, fileName, metadata);
    return null;
  } catch (error) {
    functions.logger.log(error);
    return null;
  }
}

/**
 * @param {Bucket} storageRef
 * @param {string} fileName
 * @param {Object} metadata
 */
async function updateFileMetadata(storageRef, fileName, metadata) {
  try {
    await storageRef.file(fileName).setMetadata(metadata);
    return null;
  } catch (error) {
    functions.logger.log(error);
    return null;
  }
}
