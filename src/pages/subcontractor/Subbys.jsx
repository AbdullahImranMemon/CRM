import { useState } from "react";
import { AddEntity } from "../../components/AddingEntity";
import {SubbyDisplay} from "./subby-display"

export const AddSubby = () => {
  const [formStatus, setFormStatus] = useState(false);
  
  return(
    
    <div className="mt-14 p-4">

      {!formStatus&&<SubbyDisplay/>}
      <button onClick={()=>{setFormStatus(!formStatus)}}>{!formStatus?<p className="mt-3 ml-3 border-2 border-blue-300 text-blue-500 p-2 rounded-md hover:bg-blue-100 focus:outline-none" size={15}>Add New Subcontractor</p>:"Back"}</button>
      {formStatus&&<AddEntity type = "subcontractor"/>}
    </div>
  )};