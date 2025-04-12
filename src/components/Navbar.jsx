import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar, SidebarItem } from "./Sidebar";
import { FaBriefcase, FaChessKing, FaChild, FaHome } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { BiSolidTrafficCone } from "react-icons/bi";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {user !== null && (
        <>
          <Sidebar>
            <SidebarItem icon={<FaHome size={30} />} navLink = "/home" text="DashBoard"/>
            <SidebarItem icon={<FaChild size={30} />} navLink = "/Builder" text="Builder Info" />
            <SidebarItem icon={<MdPersonSearch size={30} />} navLink = "/Subby" text="Subby Info" />
            <SidebarItem icon={<FaChessKing size={30} />} text="Master List" />
            <SidebarItem icon={<FaBriefcase size={30} />} text="Job List" />
            <SidebarItem icon={<BiSolidTrafficCone size={30} />} text="Trade List" />
          </Sidebar>
        </>
      )}
    </>
  );
};

export const Topbar = () => {
  const location = useLocation();

  const locationDict = {'/home': "Home",'/Builder':"Builder", '/Subby' : "Subcontractor"};

  return (
    <div className="w-full fixed">
      <nav className="bg-darkBlue h-16 w-full">  {/* Set fixed height and full width */}
        <div className="flex items-center justify-between h-full px-4">
          <span className="text-white font-serif text-3xl">{`${locationDict[location.pathname]||"CRM"}`}</span>
        </div>
      </nav>
    </div>
  );
};