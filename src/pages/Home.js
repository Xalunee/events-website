import { useEffect, useState } from "react";
import Header from "../components/Header";
import Events from "../components/Events";
import { getEvents } from "../services/event.js";

const Home = () => {
  return (
    <>
      <Header></Header>
      <h1 className="text-center mb-4 mt-3">Мероприятия</h1>
      <div className="d-flex justify-content-center">
        <Events></Events>
      </div>
    </>
  );
};

export default Home;
