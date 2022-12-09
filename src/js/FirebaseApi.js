// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import LocaleStorageApi from './LocaleStorageApi';

import { firebaseConfig } from './projectOptions';

// 1. await login

// init
// 2. read data drom firebase
// 3. write data to localStorage
// 4. render User into interfece
// 5. Colorising button

// logOut
// 4. read data from localStorage
// 5. write data to firebase
// 6. clear localStorage
// 7 Remove User from interface
// 8. Disable button
// 7. log out

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const lsAPI = new LocaleStorageApi();

const QUEUE_KEY = 'QUEUE';
const WATCHED_KEY = 'WATCHED';

// const TEST_USER1 = {
//   email: 'filmoteka@gmail.com',
//   password: '111111',
// };
// const TEST_USER2 = {
//   email: 'KinaNeBudet@gmail.com',
//   password: '111111',
// };

// const TEST_DATA = {
//   QUEUE: [
//     { id: 1, name: 'Back to the future', genre: 'komedy', year: '1980' },
//     { id: 2, name: 'Back to the future-2', genre: 'komedy', year: '1981' },
//     { id: 3, name: 'Back to the future-3', genre: 'komedy', year: '1982' },
//   ],
//   WATCHED: [
//     { id: 1, name: 'MIB', genre: 'action', year: '1995' },
//     { id: 2, name: 'MIB-2', genre: 'action', year: '1997' },
//     { id: 3, name: 'MIB-3', genre: 'action', year: '2001' },
//   ],
// };
// const TEST_DATA2 = {
//   QUEUE: [
//     { id: 1, name: 'Star Wars', genre: 'komedy', year: '1980' },
//     { id: 2, name: 'Star Wars-2', genre: 'komedy', year: '1981' },
//     { id: 3, name: 'Star Wars-3', genre: 'komedy', year: '1982' },
//   ],
//   WATCHED: [
//     { id: 1, name: 'Gallactika', genre: 'action', year: '1995' },
//     { id: 2, name: 'Gallactika-2', genre: 'action', year: '1997' },
//     { id: 3, name: 'Gallactika-3', genre: 'action', year: '2001' },
//   ],
// };

export default class FirebaseApi {
  constructor(refs) {
    this.currentUser = '';
    this.auth = getAuth();
    this.email = '';
    this.password = '';
    this.isLogined = false;
    this.authHandler = onAuthStateChanged;

    // Refs from interface
    this.refs = refs;
  }

  toggleUserStatus = () => {
    this.isLogined = !this.isLogined;
  };

  getUserStatus = () => this.isLogined;
  setUserStatus = status => {
    this.isLogined = status;
  };

  getUser = () => {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
  };

  setUser = ({ email, password }) => {
    this.email = email;
    this.password = password;
  };

  // Register New user
  registerUser = async () => {
    return await this.signUp();

    // Getting current user
    // this.getUser();
    // console.log('this.currentUser :>> ', this.currentUser);
    // 2. read data drom firebase
    // const data = await this.readData();
  };

  // existing user login
  init = async () => {
    // 1. await login
    await this.signIn();

    // Getting current user
    this.getUser();

    if (!this.currentUser) {
      // user not exist MSG
      console.log('User not authtorised');
      return;
    }
    // console.log('this.currentUser :>> ', this.currentUser);
    // 2. read data drom firebase
    const data = await this.readData();
    console.log('data :>> ', data);

    const QUEUE = data.queue;
    const WATCHED = data.watched;
    const dataToBase = { QUEUE, WATCHED };
    console.log('dataToBase :>> ', dataToBase);

    // 3. write data to localStorage
    if (dataToBase) {
      lsAPI.save(dataToBase);
    }

    // await this.signIn();

    // await this.saveData(TEST_DATA2);
  };

  // Method create new user
  signUp = async () => {
    const login = await this.email;
    const password = await this.password;

    return createUserWithEmailAndPassword(this.auth, login, password)
      .then(userCredential => {
        const user = userCredential.user;

        // console.log('NEW user :>> ', user);

        const QUEUE = [];
        const WATCHED = [];
        const dataToBase = { QUEUE, WATCHED };
        // console.log('dataToBase :>> ', dataToBase);
        // this.getUser();

        // write data to firebase
        this.saveData(dataToBase);
        // createUserDataObj(getCurrentUserAuthData(user));

        // 3. write data to localStorage
        if (dataToBase) {
          lsAPI.save(dataToBase);
        }

        this.setUserStatus(true);
        return this.getUserStatus();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode :>> ', errorCode);
        console.log('errorMessage :>> ', errorMessage);
      });
    // refs.loginForm.reset();
  };

  // Method for User login
  signIn = async e => {
    const login = this.email;
    const password = this.password;

    await signInWithEmailAndPassword(this.auth, login, password)
      .then(user => {
        // console.log('user>>', user);
        this.setUserStatus(true);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode :>> ', errorCode);
        console.log('errorMessage :>> ', errorMessage);
      });
  };

  // Method for User logout
  logOut = () => {
    // logOut
    // 4. read data from localStorage

    const queue = lsAPI.read(QUEUE_KEY);
    const watched = lsAPI.read(WATCHED_KEY);

    const dataToBase = { queue, watched };
    // console.log('dataToBase :>> ', dataToBase);

    // 5. write data to firebase
    this.saveData(dataToBase);

    // 6. clear localStorage
    lsAPI.remove(QUEUE_KEY);
    lsAPI.remove(WATCHED_KEY);

    // 7. log out
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.', this.auth);

        //   localeStorage.remove(this.currentUser.uid);
      })
      .catch(error => {
        // An error happened.
        console.log('Sign-out error happened:', error);
      });
  };

  readData = async () => {
    // const currentUser = await getUser();

    const dbRef = ref(database);

    const snapshot = await get(child(dbRef, `users/${this.currentUser.uid}`));
    const data = await snapshot.val();
    console.log('data from Base :>> ', data);
    return data;
  };

  // Method for saving data to Firebase
  saveData = async dataObj => {
    // const currentUser = this.getUser();
    this.getUser();

    // console.log('dataObj :>> ', dataObj);
    // console.log('currentUser saveData :>> ', this.currentUser);
    // console.log('this.auth saveData :>> ', this.auth);

    set(ref(database, `users/${this.currentUser.uid}`), dataObj)
      .then(() => {
        console.log('database is successfuly written.');
      })
      .catch(error => {
        console.log('Write error :>> ', error);
      });
  };
}

// Request module---------------------------------------------------
// const firebase = new FirebaseApi(TEST_USER2);
// firebase.signUp();
// firebase.setUser(TEST_USER1);
//save some data
// firebase.saveData(TEST_DATA2);
// firebase.init();
//login

// firebase.signUp();

// setTimeout(() => {
//   firebase.logOut();
// }, 10000);
