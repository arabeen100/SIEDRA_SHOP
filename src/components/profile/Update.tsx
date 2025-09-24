import Profilecard from "./Profilecard"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { Eye,EyeOff } from "lucide-react";
import { SpinnerCircular } from "spinners-react";
import { useUpdateInfoMutation,useGetProfileQuery } from "../../features/api/apiSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Update = () => {
  type ApiErrorResponse = {
  status: boolean;
  message: string;
  errors: string[];
};
  const{data:profile}=useGetProfileQuery();
const navigate=useNavigate();
  const[update,{isLoading,error}]=useUpdateInfoMutation();
  const updatedError=error as FetchBaseQueryError;
  const apiError=updatedError?.data as ApiErrorResponse;
  const{t,i18n}=useTranslation();
    const [email,setEmail]=useState<string>("");
    const [username,setUsername]=useState<string>("");
    const [name,setName]=useState<string>("");
    const [phone,setPhone]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [showPassword,setShowPassword]=useState<boolean>(false);
    useEffect(()=>{
      if(profile){
        setEmail(profile?.data?.user?.email);
         setName(profile?.data?.user?.name);
         setPhone(profile?.data?.user?.phone);
          setUsername(profile?.data?.user?.username)
      }
    },[profile])
        const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("name",name);
      formData.append("email",email);
      formData.append("username",username);
       formData.append("password",password);
      formData.append("phone",phone);
      try {
       const response= await update(formData).unwrap();
        if(response.status){
          navigate("/profile");
          toast.success(t("profile_updated_success"))
        }
      } catch (error) {
        console.log(error);
        
      }
    } 
  return (
      <div className="pt-33 w-[95%] md:pt-23 md:w-[750px] lg:w-[958px] min-[1440px]:w-[1422px] mx-auto min-[1440px]:flex min-[1440px]:items-center min-[1440px]:justify-center min-[1440px]:gap-5 xl:min-h-[800px]">
      <Profilecard/>
      
      <div className="bg-white rounded-2xl   px-12 pt-7 pb-7 mt-3 md:flex md:items-center md:justify-around min-[1440px]:w-[1107.2px]">
        <div className="flex flex-col justify-center md:w-[60%] min-[1440px]:w-[40%] ">
        <p className="text-xl px-3 text-purple-600 mb-2">{t("update_profile")}</p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full mt-3 px-3 ">
         
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("form.email")}</label>
          <input
           required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
           type="email" name="email" id="email" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
          
         
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">{t("form.username")}</label>
          <input
          required
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
           type="text" name="username" id="username" className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
          
         
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t("form.name")}</label>
          <input
          required
            value={name}
            onChange={(e)=>setName(e.target.value)} 
          type="text" name="name" id="name" className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  /> 
          
         
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t("form.phone")}</label>
          <input
          required
            value={phone}
            onChange={(e)=>setPhone(e.target.value)} 
           type="text" name="phone" id="phone" className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0" />
          
         
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t("form.password")}</label>
          <div className="relative">
          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}  
          type={showPassword?"text":"password"} name="password" id="password" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
            <Eye onClick={()=>setShowPassword(true)}  size={17} className={`${!showPassword?"block":"hidden"}  absolute top-4 ${i18n.language==="de"? "left-[calc(100%-23px)]":"right-[calc(100%-23px)]"} text-gray-700  cursor-pointer`} />
            <EyeOff  onClick={()=>setShowPassword(false)}  size={17} className={`${showPassword?"block":"hidden"} absolute top-4 ${i18n.language==="de"? "left-[calc(100%-23px)]":"right-[calc(100%-23px)]"} text-gray-700 cursor-pointer`} />
          </div>
          <ul className={`list-disc mt-2 mb-5 ${validations.length&&validations.lowercase&&validations.number&&validations.special&&validations.uppercase&&"hidden"} ${password?"block":"hidden"} `}>
            <li className={`text-sm ${validations.length ? "text-gray-600" : "text-red-600"}`}>{t("form.password_min_length")}</li>
            <li className={`text-sm ${validations.uppercase ? "text-gray-600" : "text-red-600"}`}>{t("form.password_uppercase")}</li>
            <li className={`text-sm ${validations.lowercase ? "text-gray-600" : "text-red-600"}`}>{t("form.password_lowercase")}</li>
            <li className={`text-sm ${validations.number ? "text-gray-600" : "text-red-600"}`}>{t("form.password_number")}</li>
            <li className={`text-sm ${validations.special ? "text-gray-600" : "text-red-600"}`}>{t("forms.password_special_char")}</li>
          </ul>
          <ul className="list-disc mt-2 mb-5">
                <li className={` ${apiError?.errors?.includes("Username can't Be Less Than 4 Characters.")?"":"hidden"} text-sm text-red-600`}>{t("forms.username_min_length")}</li>
                <li className={`${apiError?.errors?.includes("This username is already taken.")?"":"hidden"} text-sm text-red-600`}>{t("form.username_taken")}</li> 
                <li className={`${apiError?.errors?.includes("This email is already taken.")?"":"hidden"} text-sm text-red-600  `}>{t("form.email_taken")}</li>
          </ul>
          
          
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
            <p>{t("update")}</p>
          {isLoading&&<SpinnerCircular size={20} color="white"/>}</button>
        </form>
        </div>
        <img src="	https://siedra-shop.eu/88e908bfd66060b639ab.webp" alt="SIEDRA" loading="lazy" className="w-[200px] h-[164.719px] max-md:hidden"/>
      </div>
      
    

    </div>
  )
}

export default Update