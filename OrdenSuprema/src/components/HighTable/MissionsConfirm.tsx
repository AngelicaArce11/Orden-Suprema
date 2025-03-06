import { MissionToConfirm } from "./MissionToConfirm";
import { NavBar } from "../../elements/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

export const MissionsConfirm = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Mission/Review")
      .then((response) => setMissions(response.data))
      .catch((error) =>
        console.error("Error fetching missions under review:", error)
      );
  }, []);

  return (
    <>
      <NavBar user={"yo"} />
      <div className="mt-20">
        {missions.map((mission: Mission) => (
          <MissionToConfirm mission={mission} />
        ))}
      </div>
    </>
  );
};
