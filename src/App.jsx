import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/login/login-form";
import { Navbar, Topbar } from './components/Navbar';
import { Home } from './pages/Home';
import { AddSubby } from './pages/subcontractor/Subbys';
import { Dashboard } from './pages/dashboard';
import { AddBuilder } from './pages/builder/Builder';
import { createContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebaseconfig';


export const SidebarContext = createContext();

function App() {

  const [expanded, setExpanded] = useState(false)
  const [user] = useAuthState(auth);
  
  return (
    <div>
      <Router>
        <div className="app-layout">
          
          <SidebarContext.Provider value={{ expanded, setExpanded }}>

            <Navbar />

          </SidebarContext.Provider>
          
        <div className={`flex flex-col w-full transition-all ${user === null ? "ml-0" : (expanded !== false ? "ml-60" : "ml-20")}`}>
          {console.log(user)}
            
            {user&&<Topbar/>}

            <div className="w-full">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Subby" element={<AddSubby />} />
                <Route path="/Builder" element={<AddBuilder />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="*" element={<h1>Page Not Found!</h1>} />
              </Routes>
            </div>
          
          </div>


        </div>
      </Router>
    </div>
  );
}

export default App;
