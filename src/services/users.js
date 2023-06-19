import { db } from "./init.js";
import store from "../slices/index.js";
import {
  query,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { actions } from "../slices/usersSlice.js";

const usersCollection = collection(db, "users");

export const fetchUsers = async () => {
  const queryUsers = query(usersCollection);

  onSnapshot(queryUsers, async (querySnapshot) => {
    const users = querySnapshot.docs.map((user) => {
      return {
        ...user.data(),
        id: user.id,
      };
    });
    store.dispatch(actions.setUsers(users));
  });
};

export const updateUser = async (data, id) => {
  try {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, data);
  } catch (e) {
    console.log(e);
    console.log("Изменить пользователя не удалось");
  }
};

export const removeUser = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef); // удаляем документ мероприятия
  } catch (e) {
    console.log(("Удалить мероприятие не удалось"));
  }
};
