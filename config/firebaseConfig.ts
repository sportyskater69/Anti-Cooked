import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'IzaSyA3B0-Xj24eabH0vNYqQxQZ3FzfPGV-SJ8',
    authDomain: 'anticooked.firebaseapp.com',
    projectId: 'anticooked',
    storageBucket: 'anticooked.firebasestorage.app',
    messagingSenderId: '232198135749',
    appId: '1:232198135749:web:28d527e56afbc6c744f5ac'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
