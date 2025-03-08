import { MissionToConfirm } from "./MissionToConfirm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi2";

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
      <div className="mt-20">
        {missions.length === 0 ? (
          <div className="flex justify-center items-center mt-30">
            <Alert
              color="failure"
              icon={() => (<HiInformationCircle  size={30} className="m-2"/>
              )}
            >
              <span className="font-semibold text-sm lg:text-xl ">
                No hay misiones completadas pendientes por revisar.
              </span>
            </Alert>
          </div>
        ) : (
          missions.map((mission: Mission) => (
            <MissionToConfirm
              mission={mission}
              onMissionUpdated={fetchMissions}
              imageId={1}
            />
          ))
        )}
      </div>
    </>
  );
};
