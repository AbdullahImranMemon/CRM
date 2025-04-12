import { FaBars, FaUserAlt, FaUserAltSlash, FaUserAstronaut, FaUserCircle, FaUserCog } from 'react-icons/fa';
import { createContext, useContext, useEffect, useState } from "react"
import { FaUser, FaUserDoctor } from 'react-icons/fa6';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { SidebarContext } from '../App';


export const Sidebar = (props) => {
  
  const navigate = useNavigate();
    
  const signUserOut = async ()=> {
  
    await signOut(auth);
    navigate("/")
  }
  const { setExpanded,expanded } = useContext(SidebarContext); // Accessing context


  return (
    
    <aside className="h-screen fixed">
      <nav className="h-full flex flex-col bg-darkBlue border-r shadow-sm">
        <div className="p-5 pb-8 flex justify-between items-center">
          <button onClick={() => setExpanded(!expanded)} className="p-3 rounded-lg bg-white hover:bg-white">
            {expanded ? <FaBars size={19} /> : <FaBars />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {// children is an inbuilt thing, anything that is wrapped in between is considered as 'children' 
            props.children}
          </ul>
        </SidebarContext.Provider>

        <div className='relative'>
          <button className='text-white group px-4 pb-4'>
            <FaUserCircle size={12} className='w-10 h-10 mt-1 ' />
            <div className='z-1 hidden absolute bg-white rounded-lg shadow w-44 group-hover:block bottom-12 left-12'>
              {
                // group-focus: block means the div (the dropdown) becomes visible (block) when the parent button gets "hover"-ed
              }
              <ul className='py-2 text-lg text-gray-950'>
                <li><a href="">Profile</a></li>
                <li><a href="">Setting</a></li>
                <li onClick={()=>{
                  signUserOut();
                  navigate("/");}
                }><a href="">Logout</a></li>
              </ul>
            </div>
          </button>
        </div>

        <div className="border-t flex p-3">
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}/>
        </div>
      </nav>
    </aside>
  )
}

export const  SidebarItem = ({ icon, text, active, alert, navLink } ) => {
  const navigate = useNavigate();

  // the above is a way of getting the elements of props, makes code cleaner here
  const { expanded } = useContext(SidebarContext);
  return (
    <li onClick={()=>{navigate(navLink)}} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-800 text-white"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-24 ml-3" : "w-0"}`}>{text}</span>
      {alert && (
          <div className={`absolute right-2 w-1 h-2 rounded bg-darkBlue ${expanded ? "" : "top-2"}`}></div>
      )}

      {!expanded && (
          <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-darkBlue text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
            {text}
          </div>
      )}
    </li>
  )
}