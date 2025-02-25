import { Mission } from "../../types"
import { missions } from "../../db";
import { MissionToConfirm } from "./MissionToConfirm";
import { Navbar } from "flowbite-react";
import { NavBar } from "../../elements/NavBar";

export const MissionsConfirm = () => {
  return (
    <>
      <NavBar user={"yo"}/>
      <div className="mt-20">
      {missions.map((mission: Mission) => (
        <MissionToConfirm mission={mission} />
      ))}
      </div>
    </>
  )
}