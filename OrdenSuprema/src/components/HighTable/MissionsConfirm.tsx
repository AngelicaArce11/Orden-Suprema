import { Mission } from "../../types"
import { missions } from "../../db";
import { MissionToConfirm } from "./MissionToConfirm";
import { NavBar } from "../../elements/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

export const MissionsConfirm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/User")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
      
  }, []);



  return (
    <>
      <NavBar user={"yo"}/>
      <div className="mt-20">
      {missions.map((mission: Mission) => (
        <MissionToConfirm mission={mission} />
      ))}
      {users[0]}
      </div>
    </>
  )
}