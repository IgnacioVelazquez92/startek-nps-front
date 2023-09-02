// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

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
export const db = getFirestore(app);

export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, "uploads/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("File uploaded successfully");
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        reject(error);
      });
  });
}

export function uploadImg(file) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, "Carrusel/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("File uploaded successfully");
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        reject(error);
      });
  });
}

//función para guardar en firestore
export function saveDataToFirestore(data) {
  const db = getFirestore(app);
  const collectionRef = collection(db, "buenas_practicas");

  addDoc(collectionRef, data)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export const fetchDataFromFirestore = async () => {
  try {
    const collectionRef = collection(db, "buenas_practicas");
    const querySnapshot = await getDocs(collectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() contiene los datos del documento
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Error al obtener datos de Firestore: ", error);
    throw error;
  }
};

export async function saveImageDetailsToFirestore(imageDetails) {
  try {
    const collectionRef = collection(db, "Carrusel");
    const docRef = await addDoc(collectionRef, imageDetails);
    console.log("Image details added with ID: ", docRef.id);
    return docRef.id; // Puedes retornar el ID del documento si es necesario
  } catch (error) {
    console.error("Error adding image details: ", error);
    throw error;
  }
}

// Función para eliminar una imagen de Firestore
export async function deleteImageFromFirestore(imageId) {
  try {
    const db = getFirestore();
    const imageRef = doc(db, "Carrusel", imageId);
    await deleteDoc(imageRef);
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
}

// Función para obtener imágenes desde Firestore
export async function fetchImagesFromFirestore() {
  try {
    const collectionRef = collection(db, "Carrusel");
    const querySnapshot = await getDocs(collectionRef);

    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });

    return images;
  } catch (error) {
    console.error("Error al obtener imágenes de Firestore:", error);
    throw error;
  }
}
