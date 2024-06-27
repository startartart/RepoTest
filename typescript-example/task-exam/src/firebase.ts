// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDTCqpeWJqeH_1txuR0uUmyDSxg22Z1W7Y',
  authDomain: 'react-task-app-b6260.firebaseapp.com',
  projectId: 'react-task-app-b6260',
  storageBucket: 'react-task-app-b6260.appspot.com',
  messagingSenderId: '456699499957',
  appId: '1:456699499957:web:cf8c71632c2d8e5bb475fc',
  measurementId: 'G-W28ELB17JW',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
