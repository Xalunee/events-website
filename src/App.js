import './App.css';
import Form from './components/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useEffect } from "react";
import { getEvents } from "./services/event";

function App() {
	useEffect(() => {
		getEvents(); // Загрузка всех мероприятий
	});

  return (
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</BrowserRouter>
  );
}

export default App;
