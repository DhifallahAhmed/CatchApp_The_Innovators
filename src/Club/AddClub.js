import React, { useState } from "react";
import Sidebar from "../AdminDash/Sidebar";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Addclub.css";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 80vh;
  width: 20vw;
  background: #f0e3f0;
  box-shadow:0 8px 32px 0
`;

export default function AddClub() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const onSubmit =  async (event) => {
    event.preventDefault();
    if (!name || !description || !logo) {
     toast.error("Please fill in all fields");
      return;
    }

    const response = await fetch("http://localhost:3001/clubs/add",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description ,logo }),
    });
   
  };
  return (
    <div id="page-top">
      <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
      <h2>ADD Clubs</h2>
        <MainContainer>
       
      
        <form className="add-club-form" onSubmit={onSubmit}>
          
        <div className="details">
          <div className="form-group">
      
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter club name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter club description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="logoUrl">Logo URL</label>
            <input
              type="text"
              id="logoUrl"
              placeholder="Enter club logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>
        
          <button type="submit" className="btn btn-primary">
            Add Club
          </button>
          </div>
        </form>
        
    




          
    
          
       
        
        </MainContainer>
        </div>
        
        </div>
      </div>
    </div>
    
  );
}
