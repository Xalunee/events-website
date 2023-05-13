import { useEffect, useState } from "react";
import Header from "../components/Header";
import MyEvents from '../components/MyEvents';
import EventForm from '../components/EventForm';

const Home = () => {
  return (
    <>
      <Header></Header>
      <h1 className="text-center mt-3 mb-4">Мои мероприятия</h1>
      <div className="d-flex flex-column align-items-center gap-5 pb-5">
        <MyEvents></MyEvents>
      </div>
      <div className="pb-5">
			  <EventForm></EventForm>
      </div>
    </>
  );
};

export default Home;
