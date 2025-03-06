import { MissionToConfirm } from "./MissionToConfirm";
import { NavBar } from "../../elements/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

export const MissionsConfirm = () => {
  const [missions, setMissions] = useState([]);

  const fetchMissions = () => {
    axios
      .get("http://localhost:3000/Mission/Review")
      .then((response) => setMissions(response.data))
      .catch((error) =>
        console.error("Error fetching missions under review:", error)
      );
  };
  
  useEffect(fetchMissions, []);

  return (
    <>
      <NavBar user={"yo"} />
      <div className="mt-20">
      {missions.length === 0 ? (
          <div className="text-center text-xl mt-10">
            No hay misiones completadas pendientes por revisar.
          </div>
        ) : (missions.map((mission: Mission) => (
          <MissionToConfirm mission={mission} onMissionUpdated={fetchMissions} />
        )))}
      </div>
    </>
  );
};
