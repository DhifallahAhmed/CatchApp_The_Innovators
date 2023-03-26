import "./App.css";

import Spinner from "./components/Spinner";
import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./SignUp/Register";
import Login from "./SignIn/Login";
import Profile from "./Profile/Profile";
import Reset from "./SignIn/Reset";
import Users from "./SignIn/Users";
import Home from "./components/Home";
import Nav from "./Nav/Nav";
import UpdateAdmin from "./Profile/UpdateAdmin";
import AdminDash from "./AdminDash/AdminDash";
import NotFound from "./components/NotFound";
import AddClub from "./Club/AddClub";
import ViewClubs from "./Club/VIiewClubs";
import JoinClub from "./Club/JoinClub";
function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {loaded ? (
        <>
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/User" element={<Nav />}></Route>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Update" element={<UpdateAdmin/>}></Route>
            <Route path="/Reset" element={<Reset />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/Dash" element={<AdminDash />}></Route>
            <Route path="/AddClub" element={<AddClub/>}></Route>
            <Route path="/ViewClubs" element={<ViewClubs/>}></Route>
            <Route path="/joinclubs" element={<JoinClub/>}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          {/* <About/> */}
          {/* <New></New> */}
          {/* <Service></Service> */}
          {/* <Portfolio></Portfolio>
          <Testimonial></Testimonial>
          <Team></Team> */}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
