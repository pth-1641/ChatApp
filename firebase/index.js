import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDbJlud8MisQRBFDsWwqMB19AzXRvHSVcE',
    authDomain: 'chatapp-8b8e4.firebaseapp.com',
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);
const facebookProvider = new FacebookAuthProvider(app);

export { auth, googleProvider, facebookProvider };
// export default db;
