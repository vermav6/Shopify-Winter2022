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
      const name = object.name;
      const file = storageRef.file(name);
      try {
        const url = await file.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
        await getImageConcept(url, storageRef, name);
      } catch (error) {
        await classificationFailedMetadataUpdate(storageRef, name);
      }
      return;
    });

/**
 * @param {string} url
 * @param {Bucket} storageRef
 * @param {string} name
 */
async function getImageConcept(url, storageRef, name) {
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
          await classificationFailedMetadataUpdate(storageRef, name);
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
            classification_status: 1,
            classifications: final,
          },
        };
        await updateFileMetadata(storageRef, name, metadata);
        return;
      },
  );
}

/**
 * @param {Bucket} storageRef
 * @param {string} name
 * @param {Object} metadata
 */
async function classificationFailedMetadataUpdate(storageRef, name) {
  try {
    const metadata = {
      metadata: {
        classification_status: 2,
      },
    };
    await storageRef.file(name).setMetadata(metadata);
    return null;
  } catch (error) {
    functions.logger.log(error);
    return null;
  }
}

/**
 * @param {Bucket} storageRef
 * @param {string} name
 * @param {Object} metadata
 */
async function updateFileMetadata(storageRef, name, metadata) {
  try {
    await storageRef.file(name).setMetadata(metadata);
    return null;
  } catch (error) {
    functions.logger.log(error);
    return null;
  }
}
