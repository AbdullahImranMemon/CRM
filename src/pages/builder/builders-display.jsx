import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../config/firebaseconfig";
import { FaPlus } from 'react-icons/fa';


export const BuilderDisplay = () =>{
  const auth = getAuth();
  const [builderList, setBulderList] = useState(null);
  const [collectionRef, setCollectionRef] = useState(null);

  useEffect(()=>{
    const usubscribe = onAuthStateChanged(auth, (user)=>{
      if (user){
        const docLink = doc(database, "users",auth.currentUser.uid);
        setCollectionRef(collection(docLink,"builders"))
      }
    })

    return ()=>{usubscribe()};
  },[auth])

  const getBuilders = async () => {
    const data = await getDocs(collectionRef);
    setBulderList(data.docs.map((builder)=>{
      return {...builder.data(), id:builder.id}}
    ));
  }

  useEffect(()=>{
    if (collectionRef){
    getBuilders();
    }
  },[collectionRef])

  return(
    // every tag needs to have a unique key apprently (useful when deletion and updating)

    <div className="flex">
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Builder Name</p>}

        {builderList ?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.name}</p>})}
      </div>
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Type</p>}

        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.type}</p>})}
      </div>
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Capacity</p>}

        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.capacity}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Abn</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.abn}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Address</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.address}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Region</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.region}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Contact</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.contact}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Tel</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.tel}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Mob</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.mob}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Email</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.email}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Website</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.website}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Remarks</p>}
        {builderList?.map((builder)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {builder.id}>{builder.remarks}</p>})}
      </div>

    </div>
  )
}