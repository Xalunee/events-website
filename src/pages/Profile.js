import { useEffect, useState } from "react";
import Header from "../components/Header";
import EventForm from '../components/EventForm';

const Home = () => {
  return (
    <>
      <Header></Header>
      <h1 className="text-center">Создать мероприятие</h1>
			<EventForm></EventForm>
    </>
  );
};

export default Home;
