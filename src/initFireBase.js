import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtgYKaQOmH8iVaIbJsasvieb_kgTCjZfA",
  authDomain: "performance-lessons.firebaseapp.com",
  databaseURL: "https://performance-lessons-default-rtdb.firebaseio.com/",
  projectId: "performance-lessons",
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}
let defaultStorage = getStorage(firebaseApp);
let defaultFirestore = getFirestore(firebaseApp);

// ----- GET DATA --------------------
const dbRef = ref(getDatabase(firebaseApp));
get(child(dbRef, "/students"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      //   console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
// ------ GET DATA --------------
// ------ WRITE DATA Basic write operations--------------
function createNewProfile(userId, name, familyName, email) {
  const db = getDatabase(firebaseApp);
  set(ref(db, "users/" + userId), {
    profile: {
      name: name,
      familyName: familyName,
      email: email,
    },
  });
}
// ------ WRITE DATA Basic write operations--------------

// console.log(defaultStorage, defaultFirestore);
export { firebaseApp, createNewProfile };
