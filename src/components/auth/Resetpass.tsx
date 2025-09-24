import { useTranslation } from "react-i18next"
import { useState } from "react"
import { SpinnerCircular } from "spinners-react"
import { Link,useNavigate } from "react-router-dom"
import { Eye,EyeOff } from "lucide-react"
import ProtectedStep from "../ProtectedStep"
import { useResetPasswoedMutation } from "../../features/api/apiSlice"
const Resetpass = () => {
  const navigate=useNavigate();
  const {t,i18n}=useTranslation();
  const[email,setEmail]=useState<string>("");
  const[code,setCode]=useState<string>("");
  const[newPassword,setNewPassword]=useState<string>("");
  const[showPassword,setShowPassword]=useState<boolean>(false);
  const [reset,{isLoading,error}]=useResetPasswoedMutation();
      const validations = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };
      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("email",email);
      formData.append("resetPasswordCode",code);
      formData.append("password",newPassword);


      try {
        const response=await reset(formData).unwrap();
        if(response.status){
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <ProtectedStep from="forgot-pass" redirectTo="/login">
     <div className="pt-33 xl:min-h-[800px]" >
      <div className=" w-[95%] md:w-[500px] flex-col flex items-center rounded-xl py-13 px-3 mx-auto h-fit bg-white">
        <img src=" 	https://siedra-shop.eu/88e908bfd66060b639ab.webp" alt="logo" className="mx-auto w-[100px] h-[82.359px] " loading="lazy"/>
        <form onSubmit={handleSubmit} className="flex flex-col  w-[70%] mt-3 px-3 ">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">{t("form.reset_code")}</label>
          <input
          required
            value={code}
            onChange={(e)=>setCode(e.target.value)}
           type="text" name="code" id="code" className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
         
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("form.email")}</label>
          <input
           required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
           type="email" name="email" id="email" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
          
         

          
         
          <label htmlFor="newPass" className="block text-sm font-medium text-gray-700">{t("form.new_password")}</label>
           <div className="relative">
              <input
               required
               value={newPassword}
               onChange={(e)=>setNewPassword(e.target.value)}  
               type={showPassword?"text":"password"} name="password" id="password" className=" mt-1 p-2 block w-full border border-gray-200  rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
              <Eye onClick={()=>setShowPassword(true)}  size={17} className={`${!showPassword?"block":"hidden"}  absolute top-4 ${i18n.language==="de"? "left-[calc(100%-23px)]":"right-[calc(100%-23px)]"} text-gray-700  cursor-pointer`} />
              <EyeOff  onClick={()=>setShowPassword(false)}  size={17} className={`${showPassword?"block":"hidden"} absolute top-4 ${i18n.language==="de"? "left-[calc(100%-23px)]":"right-[calc(100%-23px)]"} text-gray-700 cursor-pointer`} />
               
           </div>
            <ul className={`list-disc mt-2 mb-5 ${validations.length&&validations.lowercase&&validations.number&&validations.special&&validations.uppercase&&"hidden"} ${newPassword?"block":"hidden"} `}>
            <li className={`text-sm ${validations.length ? "text-gray-600" : "text-red-600"}`}>{t("form.password_min_length")}</li>
            <li className={`text-sm ${validations.uppercase ? "text-gray-600" : "text-red-600"}`}>{t("form.password_uppercase")}</li>
            <li className={`text-sm ${validations.lowercase ? "text-gray-600" : "text-red-600"}`}>{t("form.password_lowercase")}</li>
            <li className={`text-sm ${validations.number ? "text-gray-600" : "text-red-600"}`}>{t("form.password_number")}</li>
            <li className={`text-sm ${validations.special ? "text-gray-600" : "text-red-600"}`}>{t("forms.password_special_char")}</li>
            </ul>
            {error&&<ul className="list-disc">
               <li className="text-red-600 text-sm">{t("form.invalid_code_or_email")}</li>
            </ul>} 
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
              <p>{t("form.confirm_reset")}</p>
             {isLoading&& <SpinnerCircular size={20} color="white" className=""/>}
            </button>
            <Link to={"/login"} className="mt-4 text-gray-700 text-sm text-center hover:underline "> {t("navbar.login")}</Link>
        </form>
      </div>
     </div> 
     </ProtectedStep>    
  )
}

export default Resetpass