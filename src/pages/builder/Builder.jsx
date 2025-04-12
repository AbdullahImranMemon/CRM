import { AddEntity } from "../../components/AddingEntity";
import { useState } from "react";
import { BuilderDisplay } from "./builders-display";
import { FaPlus } from 'react-icons/fa';


export const AddBuilder = ()=> {
  const [formStatus, setFormStatus] = useState(false);


  return(
    <div className="mt-14 p-4">


      {!formStatus&&<BuilderDisplay/>}


      {formStatus&&<AddEntity type = "builder"/>}
      <button onClick={()=>{setFormStatus(!formStatus)}}>{!formStatus?<p className="mt-3 ml-3 border-2 border-blue-300 text-blue-500 p-2 rounded-md hover:bg-blue-100 focus:outline-none">Add New Builder</p>:"Back"}</button>
    </div>
  );

}