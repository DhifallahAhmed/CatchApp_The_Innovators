import React from "react";
import ViewClubs from "./VIiewClubs";




function ListeClubs(){
    return (
        <div>
        <h1 className="heading">Clubs</h1>
        {Clubs.map(club => ( 
     <ViewClubs
      key={club.id}
      name={club.name}
      img={club.logo}
      description={club.description} 
    />
    ))}
    </div>
    )
}
export default ListeClubs ; 