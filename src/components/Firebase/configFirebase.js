// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxfkq1g2-RsRMaDH5aRw-X34IVdTAnCLA",
  authDomain: "nps-startek-3fe3e.firebaseapp.com",
  projectId: "nps-startek-3fe3e",
  storageBucket: "nps-startek-3fe3e.appspot.com",
  messagingSenderId: "793991453161",
  appId: "1:793991453161:web:a1bcc2e71a9915e9651378",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export function uploadFile(file) {
  const storageRef = ref(storage, "some-child");
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(snapshot);
  });
}
