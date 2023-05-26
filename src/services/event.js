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
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { actions } from "../slices/eventsSlice.js";

const eventsCollection = collection(db, "events");

export const registerEvent = async (data) => {
  const isUserUniqueQuery = query(eventsCollection);
  const isUserUnique = await getDocs(isUserUniqueQuery);

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

  // const queryDocs = await getDocs(queryEvents);
  // const dataOfEvents = queryDocs.docs;
  // const events = dataOfEvents.map((data) => {
  //   const { fields } = data._document.data.value.mapValue;
  //   const entries = Object.entries(fields);
  //   const mapEntries = entries.reduce((acc, [field, value]) => {
  //     const newValue = Object.values(value)[0];
  //     if (typeof newValue === 'object') {
  //       const members = newValue.values.map((value) => value.stringValue);
  //       return ([...acc, [field, members]]);
  //     }
  //     return ([...acc, [field, newValue]]);
  //   }, []);
  //   const objectOfEntries = Object.fromEntries(mapEntries);
  //   return objectOfEntries
  // })
  // return events;
};

export const changeEvent = async (data) => {
  try {
    const eventRef = doc(db, "events", data.id); // получаем ссылку на объект мероприятия
    await setDoc(eventRef, data); // изменяем документ
    alert('Мероприятие было успешно изменено')
  } catch (e) {
    console.log("Изменить мероприятие не удалось");
  }
};

export const removeEvent = async (data) => {
  try {
    console.log(data)
    const eventRef = doc(db, "events", data.id);
    await deleteDoc(eventRef); // удаляем документ мероприятия
    console.log("Мероприятие было успешно удалено");
  } catch (e) {
    console.log(("Удалить мероприятие не удалось"));
  }
};
