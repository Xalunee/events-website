import { db } from "./init.js";
import {
  query,
  collection,
  addDoc,
  getDoc,
  doc,
  where,
  getDocs,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

export const registerUser = async (data) => {
  const isUserUniqueQuery = query(
    usersCollection,
    where("email", "==", data.email)
  );
  const isUserUnique = await getDocs(isUserUniqueQuery);

  if (isUserUnique.size > 0) {
    alert("Аккаунт с такой почтой уже существует");
  } else {
    const userRef = await addDoc(usersCollection, data);
    const userSnapshot = await getDoc(userRef);
    const newUserObj = {
      ...userSnapshot.data(),
      id: userSnapshot.id,
    };

    return newUserObj;
  }
};

export const loginUser = async (data) => {
  const userQuery = query(
    usersCollection,
    where("email", "==", data.email),
    where("password", "==", data.password)
  );
  const userSnapshot = await getDocs(userQuery);
  if (!(userSnapshot.size === 1)) {
    alert("404");
  }
  const newUserObj = {
    ...userSnapshot.docs[0].data(),
    id: userSnapshot.docs[0].id,
  };

  return newUserObj;
};

export const getUserFromDB = async () => {
  const userCollection = doc(db, "users", localStorage.token);
  const dataOfUser = await getDoc(userCollection);
  const { fields } = dataOfUser._document.data.value.mapValue;
  const entries = Object.entries(fields);
  const mapEntries = entries.reduce((acc, [field, value]) => ([...acc, [field, value.stringValue]]), []);
  const objectOfEntries = Object.fromEntries(mapEntries);

  return objectOfEntries;
};

export const getUserFromLocalStorage = () => {
  if (localStorage.length === 0) {
    return undefined;
  }
  
  const user = {
    firstname: localStorage.firstname,
    surname: localStorage.surname,
  };

  return user;
};
