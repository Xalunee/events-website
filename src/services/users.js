import { db } from "./init.js";
import store from "../slices/index.js";
import {
  query,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
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
    console.log("Пользователь был успешно изменен");
  } catch (e) {
    console.log(e);
    console.log("Изменить пользователя не удалось");
  }
};

export const removeUser = async (id) => {
  // try {
  //   const userRef = doc(db, "users", id);
  //   const chatsCollection = collection(db, "users");
  //   const chats = await getDocs(chatsCollection);
  //   chats.forEach(async (chat) => {
  //     const { messages } = chat.data();
  //     const newMessages = messages.filter(msg => msg.author.id !== id);

  //     if (newMessages.length < messages.length) {
  //       await updateDoc(chat.ref, {
  //         messages: newMessages
  //       });
  //     }

  //   });
  //   await deleteDoc(userRef);
  //   console.log("Пользователь был успешно удален");
  // } catch (e) {
  //   console.log(("Удалить пользователя не удалось"));
  // }

  try {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef); // удаляем документ мероприятия
    console.log("Мероприятие было успешно удалено");
  } catch (e) {
    console.log(("Удалить мероприятие не удалось"));
  }
};
