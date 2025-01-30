import '../../styles/MissionPage.css'
import { NavBar  } from '../../elements/navBar.tsx';
import { Table } from '../../elements/table.tsx'

export const MissionPage = () => {
  return (
    <>
      < NavBar />
      <div className='absolute left-185 top-40'>
        <h1 className='font-bold'> Misiones Publicadas </h1> 
      </div>
      < Table />
    </>
  );
}