import { useTranslation } from "react-i18next" 
import { useState } from "react"
import { Eye,EyeOff } from "lucide-react";
import { useRegisterMutation } from "../../features/api/apiSlice";
import { useNavigate ,Link} from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
const Signup = () => {
  type ApiErrorResponse = {
  status: boolean;
  message: string;
  errors: string[];
};
  const navigate=useNavigate();
  const { t ,i18n} = useTranslation();
  const [email,setEmail]=useState<string>("");
  const [username,setUsername]=useState<string>("");
  const [name,setName]=useState<string>("");
  const [phone,setPhone]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [showPassword,setShowPassword]=useState<boolean>(false);
  const[user,{isLoading,error}]=useRegisterMutation();
  const signupError=error as FetchBaseQueryError;
  const apiError=signupError?.data as ApiErrorResponse;
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
      formData.append("email",email);
      formData.append("username",username);
      formData.append("name",name);
      formData.append("phone",phone);
      formData.append("password",password);
      try {
       const response= await user(formData).unwrap();
        if(response.status){
          navigate("/verify-email",{state:{from:"signup"}});
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <div className="pt-33 xl:min-h-[800px]" >
      <div className=" w-[95%] md:w-[500px] flex-col flex items-center rounded-xl py-13 px-3 mx-auto h-fit bg-white">
        <img src=" 	https://siedra-shop.eu/88e908bfd66060b639ab.webp" alt="logo" className="mx-auto w-[100px] h-[82.359px] " loading="lazy"/>
        <form onSubmit={handleSubmit} className="flex flex-col  w-[70%] mt-3 px-3 ">
         
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
          required
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
            <p>{t("form.register")}</p>
          {isLoading&&<SpinnerCircular size={20} color="white"/>}</button>
          <Link to={"/login"} className="text-center mt-5 text-sm text-gray-500 hover:underline ">{t("form.or_login")}</Link>


        </form>
      </div>  
    </div>

  )
}

export default Signup