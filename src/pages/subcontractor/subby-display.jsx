import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { database } from "../../config/firebaseconfig";
import { collection, doc, getDocs } from "firebase/firestore";

export const SubbyDisplay = ()=>{
  
  const auth = getAuth();
  const [collectionRef, setCollectionRef] = useState(null);
  const [subbyList, setSubbyList] = useState(null);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if (user){
        const docLink = doc(database,"users",auth.currentUser.uid)
        setCollectionRef(collection(docLink, "subcontractors"))
      }
    })

    return () =>{unsubscribe()};
  },[auth])
  
  const getSubcontractors = async () => {
    const firebaseData = await getDocs(collectionRef);
    setSubbyList(firebaseData.docs.map((subby) => {return {...subby.data(), id: subby.id}}))

  }


  useEffect(()=>{
    if (collectionRef){
      getSubcontractors();
    }
  },[collectionRef])


  return(
    <div className="flex">
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500 whitespace-nowrap">Subcontractor Name</p>}

        {subbyList ?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.name}</p>})}
      </div>
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Type</p>}

        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.type}</p>})}
      </div>
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Capacity</p>}

        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.capacity}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Abn</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.abn}</p>})}
      </div>      
      
      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Quality</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.quality}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Response</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.response}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Address</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.address}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Region</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.region}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Contact</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.contact}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Tel</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.tel}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Mob</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.mob}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Email</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.email}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Website</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.website}</p>})}
      </div>

      <div className="flex flex-col border-r border-gray-500">
        {<p className = "flex text-[#235FBB] text-lg p-2 border-b border-gray-500">Remarks</p>}
        {subbyList?.map((subby)=>{return <p className="flex whitespace-nowrap border-b p-3 h-[56px]" key = {subby.id}>{subby.remarks}</p>})}
      </div>

    </div>
  )
}