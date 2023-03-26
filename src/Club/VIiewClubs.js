import React from "react";
import AddClub from "./AddClub";

function ViewClubs(props){
    return(
     
        
        <div className="card">
      <div className="top">
        
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.logo} alt="avatar_img" />
        <h2 className="name">{props.description}</h2>
        <button type="submit" className="btn btn-primary">
            Join Us 
          </button>
        </div>
        </div>
        
        
        
    )
}

export default ViewClubs;