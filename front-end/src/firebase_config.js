import { initializeApp } from "firebase/app";
import { getStorage, ref, list, getDownloadURL, getMetadata   } from "firebase/storage";
import { connectStorageEmulator } from "firebase/storage";
import {store} from "@/plugins/vuex";

import {
  getAuth,
  connectAuthEmulator 
} from "firebase/auth";

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
export const storage = getStorage(firebaseApp)
if(window.location.href.includes('emulated')) {
  document.title = "emulated"
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
}
auth.onAuthStateChanged(function(user) {
  if (user != null) {
    store.state.loggedIn = true;
    store.state.userData = user;
    getFromStorage();
 }
 else{
  store.state.loggedIn = false;
 }
});

async function getFromStorage() {
  const listRef = ref(storage, '');
  // const final=[];
  // const old = store.state.gallery;
  // Fetch the first page of 100.
  const firstPage = await list(listRef, { maxResults: 100 });
  for (const item of firstPage.items) {
    const imageRef = ref(storage, item.fullPath);
    const url = await getImageUrl(item.fullPath);
    const metadata = await getMetadata(imageRef);
    const tags = metadata.customMetadata.classifications.split(",")
    // final.push({
    //   title: `Image: ${item}`,
    //   tags:tags,
    //   uploaded: "abc",
    //   img: url,
    // });
    store.state.gallery.push({
        title: `Image: ${item}`,
        tags:tags,
        uploaded: "abc",
        img: url,
      });
  }

}

async function getImageUrl(path){
  return await getDownloadURL(ref(storage, path))
}