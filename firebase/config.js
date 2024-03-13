import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzYESqyrFq5x5WvINkKa_FqkLvOAA6spk",
  authDomain: "recommendation-system-62a42.firebaseapp.com",
  projectId: "recommendation-system-62a42",
  storageBucket: "recommendation-system-62a42.appspot.com",
  messagingSenderId: "618231349247",
  appId: "1:618231349247:web:13c4111cdab136c0f1f1ca",
  measurementId: "G-EM4P1Z169L",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // For server side rending
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
