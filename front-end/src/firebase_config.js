import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  list,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { connectStorageEmulator } from "firebase/storage";
import { store } from "@/plugins/vuex";

import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
if (window.location.href.includes("localhost")) {
  document.title = "emulated";
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
}
auth.onAuthStateChanged(function(user) {
  if (user != null) {
    store.state.loggedIn = true;
    store.state.userData = user;
    store.state.gallery = {};
    getAllImagesFromStorage();
  } else {
    store.state.loggedIn = false;
    store.state.gallery = {};
    store.state.userData = {};
  }
});

export async function getAllImagesFromStorage() {
  const listRef = ref(storage);
  const firstPage = await list(listRef, { maxResults: 100 });
  for (const item of firstPage.prefixes) {
    const bucketRef = ref(storage, item.fullPath);
    const bucketImages = await list(bucketRef, { maxResults: 100 });
    for (const image of bucketImages.items) {
      const imageAlreadyExists = store.state.gallery[image.fullPath] != null;
      const imageRef = ref(storage, image.fullPath);
      if (
        !imageAlreadyExists ||
        store.state.gallery[image.fullPath].classification_status == 0
      ) {
        if (!imageAlreadyExists) {
          store.state.gallery[image.fullPath] = {};
        }
        const metadata = await getMetadata(imageRef);
        store.state.gallery[image.fullPath]["classification_status"] =
          metadata.customMetadata.classification_status;
        let tags = [];
        if (metadata.customMetadata.classification_status == 0) {
          tags = ["Image is being classified"];
        } else if (metadata.customMetadata.classification_status == 2) {
          tags = ["Image could not be classified"];
        } else {
          tags = metadata.customMetadata.classifications.split(",");
        }
        store.state.gallery[image.fullPath]["tags"] = tags;
        store.state.gallery[image.fullPath]["title"] =
          metadata.customMetadata.imageName;
        store.state.gallery[image.fullPath]["uploaded"] = new Date(
          metadata.updated
        );
        if (!store.state.gallery[image.fullPath]["img"]) {
          store.state.gallery[image.fullPath]["img"] = await getImageUrl(
            image.fullPath
          );
        }
      }
    }
  }
}

export async function getMyImagesFromStorage() {
  const listRef = ref(storage, store.state.userData.uid);
  const firstPage = await list(listRef, { maxResults: 100 });
  for (const image of firstPage.items) {
    const imageAlreadyExists = store.state.gallery[image.fullPath] != null;
    const imageRef = ref(storage, image.fullPath);
    store.state["myImages"][image.fullPath] = true;
    if (
      !imageAlreadyExists ||
      store.state.gallery[image.fullPath].classification_status == 0
    ) {
      if (!imageAlreadyExists) {
        store.state.gallery[image.fullPath] = {};
      }
      const metadata = await getMetadata(imageRef);
      store.state.gallery[image.fullPath]["classification_status"] =
        metadata.customMetadata.classification_status;
      let tags = [];
      if (metadata.customMetadata.classification_status == 0) {
        tags = ["Image is being classified"];
      } else if (metadata.customMetadata.classification_status == 2) {
        tags = ["Image could not be classified"];
      } else {
        tags = metadata.customMetadata.classifications.split(",");
      }
      store.state.gallery[image.fullPath]["tags"] = tags;
      store.state.gallery[image.fullPath]["title"] =
        metadata.customMetadata.imageName;
      store.state.gallery[image.fullPath]["uploaded"] = new Date(
        metadata.updated
      );
      if (!store.state.gallery[image.fullPath]["img"]) {
        store.state.gallery[image.fullPath]["img"] = await getImageUrl(
          image.fullPath
        );
      }
    }
  }
}

async function getImageUrl(path) {
  return await getDownloadURL(ref(storage, path));
}
