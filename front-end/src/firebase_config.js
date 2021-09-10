import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)
if(window.location.href.includes('emulated')) {
  document.title = "emulated"
  connectStorageEmulator(storage, "localhost", 9199);
}
