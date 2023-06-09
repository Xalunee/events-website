import { db } from "./init.js";
import store from "../slices/index.js";
import {
  query,
  collection,
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { actions } from "../slices/eventsSlice.js";

const eventsCollection = collection(db, "events");

export const registerEvent = async (data) => {
  const isUserUniqueQuery = query(eventsCollection);
  await getDocs(isUserUniqueQuery);

  const userRef = await addDoc(eventsCollection, data);
  const userSnapshot = await getDoc(userRef);
  const newUserObj = {
    ...userSnapshot.data(),
    id: userSnapshot.id,
  };

  return newUserObj;
};

export const getEvents = async () => {
  const queryEvents = query(eventsCollection);
  
  onSnapshot(queryEvents, async (querySnapshot) => {
    const events = querySnapshot.docs.map((event) => {
      return {
        ...event.data(),
        id: event.id,
      };
    });
    store.dispatch(actions.setEvents(events));
  });
};

export const changeEvent = async (data) => {
  try {
    const eventRef = doc(db, "events", data.id); // получаем ссылку на объект мероприятия
    await setDoc(eventRef, data); // изменяем документ
  } catch (e) {
    console.log("Изменить мероприятие не удалось");
  }
};

export const removeEvent = async (data) => {
  try {
    console.log(data)
    const eventRef = doc(db, "events", data.id);
    await deleteDoc(eventRef); // удаляем документ мероприятия
  } catch (e) {
    console.log(("Удалить мероприятие не удалось"));
  }
};

export const cutDescription = (describtion) => {
  const result = describtion.slice(0, 35);
  return `${result}...`;
};
