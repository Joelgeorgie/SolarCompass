import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAsLMbLj0Fck2_Yj6Kxmbh9R_NjSahaYy8",
  authDomain: "solarcompass.firebaseapp.com",
  projectId: "solarcompass",
  storageBucket: "solarcompass.appspot.com",
  messagingSenderId: "647246593780",
  appId: "1:647246593780:web:393ff0bc0901a9c44828a1",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [allDetails, setAllDetails] = useState({});
  

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const userDetails = await getUserDetails(email);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      const userDetails = await getUserDetails(email);
      const result = userDetails[0];
      const valuesArray = {
        name: result.name,
        state: result.state,
        bill: result.bill,
        latitude: result.latitude,
        longitude: result.longitude
      }; 
      setAllDetails(valuesArray);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const signOutUser = () => {
    return signOut(firebaseAuth);
  };

  const enterUserDetails = async (
    email,
    name,
    state,
    bill,
    latitude,
    longitude
  ) => {
    try {
      await addDoc(collection(firestore, "users"), {
        email,
        name,
        state,
        bill,
        latitude,
        longitude,
      });
      const valuesArray = {
        name: name,
        state: state,
        bill: bill,
        latitude: latitude,
        longitude: longitude
      }; 
      setAllDetails(valuesArray);
    } catch (error) {
      console.error("Error entering user details:", error);
    }
  };

  const getUserDetails = async (email) => {
    try {
      const userRef = collection(firestore, "users");
      const querySnapshot = await getDocs(
        query(userRef, where("email", "==", email))
      );
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      return userData;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        loginUser,
        isLoggedIn,
        signOutUser,
        enterUserDetails,
        getUserDetails,
        allDetails,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
