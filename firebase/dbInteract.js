import db from './config';
import { getDocs, collection } from 'firebase/firestore/lite';

export const getData = (dbName) => getDocs(collection(db, dbName));
