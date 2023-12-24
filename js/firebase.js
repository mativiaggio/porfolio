import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

// Auth
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSeNsCJIxOn8A9yLdi4i6lSsrpPvfNyrc",
  authDomain: "matiasviaggio-portfolio.firebaseapp.com",
  projectId: "matiasviaggio-portfolio",
  storageBucket: "matiasviaggio-portfolio.appspot.com",
  messagingSenderId: "553361555206",
  appId: "1:553361555206:web:6f20ae7b631f8c4f37e887",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app);

const auth = getAuth(app);

const db = getFirestore();

async function fetchUsers() {
  const colRef = collection(db, "users");
  let aUsers = [];

  try {
    const snapshot = await getDocs(colRef);
    snapshot.docs.forEach((doc) => {
      aUsers.push({ ...doc.data(), id: doc.id });
    });
  } catch (err) {
    console.log(err.message);
  }

  return aUsers;
}

async function fetchCertificates() {
  const colRef = collection(db, "certificates");
  let certificates = [];

  try {
    const snapshot = await getDocs(query(colRef, orderBy("date", "asc")));
    snapshot.docs.forEach((doc) => {
      certificates.push({ ...doc.data(), id: doc.id });
    });
  } catch (err) {
    console.log(err.message);
  }

  return certificates;
}

async function fetchOwnerProfile() {
  const colRef = collection(db, "profile");
  let ownerProfile = [];

  try {
    const snapshot = await getDocs(colRef);
    snapshot.docs.forEach((doc) => {
      ownerProfile.push({ ...doc.data(), id: doc.id });
    });
  } catch (err) {
    console.log(err.message);
  }

  return ownerProfile;
}

async function translate(language) {
  const defaultLanguage = language;
  localStorage.setItem("defaultLanguage", defaultLanguage);

  const dictionaryColRef = collection(db, "dictionary");
  const querySnapshot = await getDocs(dictionaryColRef);

  querySnapshot.forEach(async (doc) => {
    const className = doc.id;
    const translation = doc.data()[language];

    $(`.${className}`).fadeOut(function () {
      $(this).text(translation).fadeIn();
    });
  });
}

export {
  app,
  auth,
  fetchUsers,
  fetchCertificates,
  fetchOwnerProfile,
  translate,
  db,
};
