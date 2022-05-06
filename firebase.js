// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

// la function addDoc, getDocs sirven para anadir y listar documentos respectivamente
// la function onSnapShot es conocida como suscripcion y refleja los datos al cambiar
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8HPnYcVrEyP7Evt2DlJkM0Z0AdSrbuSM",
  authDomain: "crud-db-vue.firebaseapp.com",
  databaseURL: "https://crud-db-vue-default-rtdb.firebaseio.com",
  projectId: "crud-db-vue",
  storageBucket: "crud-db-vue.appspot.com",
  messagingSenderId: "928012435777",
  appId: "1:928012435777:web:0709e9658e9a2b794ee1c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = (title, description) => {
  addDoc(collection(db, 'tasks'), { title, description });
}

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);