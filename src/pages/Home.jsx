import { useEffect } from "react";
import { auth } from "../config/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  
  const [user] = useAuthState(auth);
  
  useEffect(()=>{
    console.log("MOUNTED");
  })

  return (
  <div>
    <h1 className="mt-16">{`the user is: ${user?user.email:"noc"}`}</h1>
  </div>
  )
}