import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import "../styles/viewclubs.css";

const JoinClub = () => {


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [Niveau, setNiveau] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState(null);


const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    if (
    
      fname === "" ||
      lname === "" ||
      email === "" ||
      birthdate === "" ||
      Niveau===""||

      phone === "" || profilePic===""
    ) {
      toast.error("Please fill all required fields");
      return;
    }


    
    const formData = new FormData();
   
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("birthdate", birthdate);
    formData.append("Niveau", Niveau);
    formData.append("phone", phone);
    if (profilePic) {
      formData.append("profilePic", profilePic, profilePic.name);
    }

    await fetch(`http://localhost:3003/joinclub`, {
      method: "POST",
      body: formData
    })
      .then(() => {
        toast.success("registered successfully");
       
      })
      .catch((error) => {
        toast.error(error.message);
      });





return(
    <div className="Container">
        <div className="title">Welcome above us</div>
        <form onSubmit={handleSubmit}>
          <div className="users-details">


            <div className="input-box">
              <label className="details">FirstName</label>
              <input
                value={fname}
                placeholder="firstname"
                id="firstname"
                type="text"
                name="firstname"
                onChange={(e) => setFname(e.target.value)}
              />
             </div>

             <div className="input-box">
              <label className="details">LastName</label>
              <input
                value={lname}
                placeholder="lastname"
                id="lasttname"
                type="text"
                name="lastname"
                onChange={(e) => setLname(e.target.value)}
              />
             </div>


             <div className="input-box">
              <label className="details">
                Email<ion-icon name="mail-outline"></ion-icon>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder=" ex : email@gmail.com"
                id="email"
                name="email"
              />
            </div>

            <div className="input-box">
              <label className="details">Birthdate</label>
              <input
                value={birthdate}
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>


            <div className="input-box">
              <label className="details">Niveau</label>
              <input
                value={Niveau}
                placeholder="Nivaeu"
                id="Niveau"
                type="text"
                name="Niveau"
                onChange={(e) => setNiveau(e.target.value)}
              />
             </div>


            <div className="input-box">
              <label className="details">Phone</label>
              <input
                value={phone}
                placeholder="phone"
                type="number"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>


            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{fontWeight:"500" }}>Profile Picture</label>
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  id="profile-pic"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{marginTop:"10px"}}
                /></div>
                </div>


                <button type="submit" className="btn btn-info">
            Confirm
          </button>
          
          </div>
          </form>
        
        </div>
        
         

)}};
export default JoinClub ;