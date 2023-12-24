import {
  fetchUsers,
  fetchCertificates,
  fetchOwnerProfile,
  translate,
  db,
} from "./firebase.js";

import { calculateYearsDifference } from "./functions.js";

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

async function addUser(email, userId) {
  const usersCollection = collection(db, "users");

  await addDoc(usersCollection, {
    email: email,
    rol: "user",
    userID: userId,
  });
}

async function onDatabaseReady() {
  const certificates = await fetchCertificates();

  const listaDiv = $("#lista");

  // certificados
  certificates.forEach(function (certificate) {
    const { years, days } = calculateYearsDifference(certificate.date.toDate());
    const nuevoElemento = $("<li>").text(
      `${certificate.name} - ${years} years and ${days} days ago`
    );
    listaDiv.append(nuevoElemento);
  });
}

async function getUsers() {
  try {
    const aUsers = await fetchUsers();

    let usersJson = [];
    if (aUsers.length > 0) {
      aUsers.forEach(function (aUser) {
        let item = {
          email: aUser.email,
          rol: aUser.rol,
          userID: aUser.userID,
        };

        usersJson.push(item);
      });

      return usersJson;
    } else {
      console.error("No owner profile found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching owner profile:", error.message);
    return null;
  }
}

async function getProfile() {
  try {
    const ownerProfile = await fetchOwnerProfile();

    if (ownerProfile.length > 0) {
      const ownerP = ownerProfile[0];

      let profileJson = {
        name: ownerP.name,
        lastname: ownerP.lastname,
        birthdate: ownerP.birthdate,
        experience: ownerP.experience,
        projects: ownerP.projects,
        skills: ownerP.skills,
        location: ownerP.location,
        linkedin: ownerP.linkedin,
        github: ownerP.github,
      };

      return profileJson;
    } else {
      console.error("No owner profile found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching owner profile:", error.message);
    return null;
  }
}

async function translatePage(language) {
  translate(language);

  $(`#${language}-option-container`).addClass("disabled");
  $(
    `#${language === "english" ? "spanish" : "english"}-option-container`
  ).removeClass("disabled");
}

export { addUser, onDatabaseReady, getUsers, getProfile, translatePage };
