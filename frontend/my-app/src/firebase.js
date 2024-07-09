// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAophsoUB61f8Aiawrf_4mT2BLGnhSHcNY",
    authDomain: "testcrop2.firebaseapp.com",
    projectId: "testcrop2",
    databaseURL: "https://testcrop2-default-rtdb.firebaseio.com",
    storageBucket: "testcrop2.appspot.com",
    messagingSenderId: "937974234875",
    appId: "1:937974234875:web:c5735a44abbf52ed71fa5e"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);

export { storage, db };
