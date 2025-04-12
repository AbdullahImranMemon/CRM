import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../config/firebaseconfig";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";



export const AddEntity = (props) => {
    
  const [collectionRef, setRef] = useState(null);
  const auth = getAuth();
  
  useEffect(
    ()=>{

      // THe the "Mounting" code below is ran, when onAuthStateChanged is called it opens a listener
      // and since we are storing it in a variable, it returns the unsubscribe function from firebase which
      // is then stored in our "unsubscribe" variable, which we then call in our dismounting section to prevent memory leaks
      const unsubscribe = onAuthStateChanged(auth, (user)=>{
        if (user){
          const docLink = doc(database, "users", getAuth().currentUser?.uid);
          setRef(collection(docLink, props.type==="builder"?"builders":"subcontractors"));
        }
      })
      
      return ()=>{unsubscribe()}
    } 
    , [auth] // auth is a dependency, bacause if auth changes we will need to re run the useEffect to find the new user doc
  );
  
  const schema = props.type ==="subcontractor"? 
    yup.object().shape({
    trade: yup.string().required(),
    name: yup.string().required(),
    type: yup.string().required(),
    capacity: yup.string().required(),
    quality: yup.string().required(),
    response: yup.string().required(),
    abn: yup.string()
    .required("ABN is required")
    .min(11, "Enter a valid ABN")
    .max(11, "Enter a valid ABN"),
    address: yup.string().required(),
    region: yup.string().required(),
    contact: yup.string().required(),
    tel: yup.string("Enter a valid number").min(9).max(10),
    mob: yup.string().min(9).max(10).required(),
    email: yup.string().email().required(),
    website: yup.string(),
    remarks: yup.string(),
    }):
    
    yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    capacity: yup.string().required(),
    abn: yup.string()
    .required("ABN is required")
    .min(11, "Enter a valid ABN")
    .max(11, "Enter a valid ABN"),
    address: yup.string().required(),
    region: yup.string().required(),
    contact: yup.string().required(),
    tel: yup.string("Enter a valid number").min(9).max(10),
    mob: yup.string().min(9).max(10).required(),
    email: yup.string().email().required(),
    website: yup.string(),
    remarks: yup.string()
    });
  
    
  const { register, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(schema)});
    
  const AddEntity = async (data) => {
    console.log("works")
    collectionRef && await addDoc(collectionRef, {...data}).then(alert(props.type==="builder"?"Builder Added":"Subcontractor Added"))

    .catch((error)=> {
      alert(`Connot add ${props.type==="builder"?"builder":"subcontractor"} please try again later`)
      console.log(error)
    })
}


  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
    <form className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full max-w-md" onSubmit={handleSubmit(AddEntity)}>
      
      {props.type === "subcontractor" && (
        <>
          <label className="text-gray-700 font-medium">Trade</label>
          <input placeholder="Trade" className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" type="text" {...register("trade")} />
          <p className="text-red-500 text-sm">{errors.trade?.message}</p>
        </>
      )}

      <label className="text-gray-700 font-medium">Name</label>
      <input placeholder="Name" className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" type="text" {...register("name")} />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>
      
      <label className="text-gray-700 font-medium">Type</label>
      <select className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" {...register("type")} defaultValue={""}>
        <option value={""} disabled>Type</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Fit-out">Fit-out</option>
        <option value="Civil">Civil</option>
      </select>
      <p className="text-red-500 text-sm">{errors.type?.message}</p>

      <label className="text-gray-700 font-medium">Capacity</label>
      <select className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" {...register("capacity")} defaultValue="">
        <option value="" disabled>Capacity</option>
        {props.type === "subcontractor" ? (
          <>
            <option value="SmallJobs">Small Jobs</option>
            <option value="Medium Jobs">Medium Jobs</option>
            <option value="Big Jobs">Big Jobs</option>
          </>
        ) : (
          <>
            <option value="<500k">{"< $500k"}</option>
            <option value="0.5mil-1mil">{"$0.5 million - $1 million"}</option>
            <option value="1mil-5mil">{"$1 million - $5 million"}</option>
            <option value="5mil-10mil">{"$5 million - $10 million"}</option>
            <option value=">10mil">{"> $10 million"}</option>
          </>
        )}
      </select>
      <p className="text-red-500 text-sm">{errors.capacity?.message}</p>

      {props.type === "subcontractor" && (
        <>
          <label className="text-gray-700 font-medium">Quality</label>
          <select className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" {...register("quality")} defaultValue="">
            <option value="" disabled>Quality</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          <p className="text-red-500 text-sm">{errors.quality?.message}</p>

          <label className="text-gray-700 font-medium">Response</label>
          <select className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" {...register("response")} defaultValue="">
            <option value="" disabled>Response</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          <p className="text-red-500 text-sm">{errors.response?.message}</p>
        </>
      )}

      {['abn', 'address', 'contact', 'tel', 'mob', 'email', 'website', 'remarks'].map((field) => (
        <div key={field} className="flex flex-col space-y-1">
          <label className="text-gray-700 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" type="text" {...register(field)} />
          <p className="text-red-500 text-sm">{errors[field]?.message}</p>
        </div>
      ))}
      
      <label className="text-gray-700 font-medium">Region</label>
      <select className="bg-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" {...register("region")} defaultValue="">
        <option value="" disabled>Select Your Region</option>
        <option value="VIC">VIC</option>
        <option value="CBD">CBD</option>
        <option value="N">N</option>
        <option value="W">W</option>
        <option value="SA">SA</option>
        <option value="NSW">NSW</option>
        <option value="QLD">QLD</option>
        <option value="WA">WA</option>
      </select>
      <p className="text-red-500 text-sm">{errors.region?.message}</p>

      <button className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" type="submit">
        Submit
      </button>
    </form>
  </div>



  )};