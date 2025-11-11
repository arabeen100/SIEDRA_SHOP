import { useTranslation } from "react-i18next"
import { Link,useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { useState } from "react";
import { useForgotPasswoedMutation } from "../../features/api/apiSlice";
import ProtectedStep from "../ProtectedStep";
const Forgotpass = () => {
  const [email,setEmail]=useState<string>("")
  const {t}=useTranslation();
  const [forgot,{isLoading,error}]=useForgotPasswoedMutation();
  const navigate=useNavigate();
      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("email",email);
      try {
        const response=await forgot(formData).unwrap();
        if(response.status){
          navigate("/reset-pass",{state:{from:"forgot-pass"}});
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <ProtectedStep from="login" redirectTo="/login">
     <div className="pt-33 xl:min-h-[800px]" >
      <div className=" w-[95%] md:w-[500px] flex-col flex items-center rounded-xl py-13 px-3 mx-auto h-fit bg-white">
        <img src=" 	https://siedra-shop.grizi7.com/88e908bfd66060b639ab.webp" alt="logo" className="mx-auto w-[100px] h-[82.359px] " loading="lazy"/>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[70%] mt-3 px-3 ">
         
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("form.email")}</label>
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
           required
           type="email" name="email" id="email" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
           <p className="text-gray-700 text-sm ">*{t("form.password_reset_email_message")}</p>
            {error&&<ul className="list-disc">
               <li className="text-red-600 text-sm">{t("form.email_not_registered")}</li>
            </ul>}
           <button type="submit" className="w-full px-2 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
                <p>{t("form.reset_password")}</p>
                {isLoading&&<SpinnerCircular size={20} color="white" />}
           </button>
           <Link to={"/login"} className="mt-4 text-gray-700 text-sm text-center hover:underline "> {t("navbar.login")}</Link>
        </form>
      </div>
     </div>
     </ProtectedStep>    
  )
}

export default Forgotpass