import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseconfig"; // Assuming this file is named firebase.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth)

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string()
    .max(12, "Password must be between 8 and 12 characters")
    .min(8, "Password must be between 8 and 12 characters")
    .required("Password is required")
  });

  const {register, handleSubmit, formState : {errors}} = useForm({resolver: yupResolver(schema)});

  const onSubmit = (data)=>{
    
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/home", {replace:true})
    // ...
    })
    .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);

    });
      
  }

  useEffect(()=>{
    if (user){
      navigate("/home");
    }
  })

  return (
    <div style={{backgroundImage: "url('blue_mountain_svg.jpg')", backgroundSize: "cover", backgroundPosition: "center", height: "100vh"}}>
      <div className="flex flex-col justify-center items-center size-full">

        

        <form className = "flex flex-col outline outline-black bg-white outline-0  p-8 pl-18 pr-8 justify-center shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
          
          <img src="temp_logo.png" alt="logo" className="w-96 h-48 mb-10"/>
          <p className="flex justify-center font-sans text-3xl mb-10 text-darkBlue">Welcome Back</p>
          <p className="flex justify-center font-sans text-sm mb-10 text-slate-500">Please enter your details to login</p>
          <input className = "outline outline-1 shadow-2xl outline-black rounded-1 m-4 p-1 w-90" type = "text" placeholder="Enter Email" {...register("email")}/>
          <p style={{color:"red", font: "12px"}}>{errors.email?.message}</p>
          
          <input className = "outline outline-1 shadow-2xl outline-black rounded-1 m-4 p-1 w-90" type = "Password" placeholder="Enter Password" {...register("password")}/>
          <p style={{color:"red", font: "12px"}}>{errors.password?.message}</p>
          
          <input className="bg-[#2D62C3] text-white outline outline-1 outline-black rounded-md p-1 mt-6 hover:bg-[#1A4F8F] cursor-pointer" type = "submit" value={"Login"}/>
        
          <p className="flex justify-center font-sans text-sm mt-10 mb-12 text-slate-500">Having trouble signing in?  <a href="/" className="text-blue-500">Contact Us</a></p>
        </form>

      </div>
    </div>
  )

}