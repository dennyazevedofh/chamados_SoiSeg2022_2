import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBysvYNIZxBJu5hI28EDgxdBo79N2X1A9c",
  authDomain: "sistema-e79a5.firebaseapp.com",
  projectId: "sistema-e79a5",
  storageBucket: "sistema-e79a5.appspot.com",
  messagingSenderId: "601833561392",
  appId: "1:601833561392:web:0efef72eadc0326cb87cf5",
  measurementId: "G-4YWD9J6KK4"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;