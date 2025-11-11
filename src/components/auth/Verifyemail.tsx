import { useTranslation } from "react-i18next"
import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react"
import { useVerifyEmailMutation } from "../../features/api/apiSlice";
import{ SpinnerCircular } from "spinners-react";
import ProtectedStep from "../ProtectedStep";
const Verifyemail = () => {
  const navigate=useNavigate();
  const[verification,{isLoading,error}]=useVerifyEmailMutation();
  const [email,setEmail]=useState<string>("");
  const [code,setCode]=useState<string>("");
  const { t } = useTranslation();
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("email",email);
      formData.append("verificationCode",code);

      try {
        const response=await verification(formData).unwrap();
        if(response.status){
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <ProtectedStep from="signup" redirectTo="/signup">
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
           <label htmlFor="code" className="block text-sm font-medium text-gray-700">{t("form.verification_code")}</label>
          <input
            value={code}
            onChange={(e)=>setCode(e.target.value)}
          required
           type="text" name="code" id="code" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
            {error&&<ul className="list-disc">
               <li className="text-red-600 text-sm">{t("forms.invalid_data")}</li>
            </ul>}
           <button type="submit" className="w-full px-2 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
            <p>{t("forms.verify_email")}</p>
            {isLoading&&<SpinnerCircular size={20} color="white" />}
          </button>
          <Link to={"/signup"} className="mt-4 text-gray-700 text-sm text-center hover:underline "> {t("forms.register")}</Link> 
        </form>
      </div>
    </div> 
    </ProtectedStep>  
  )
}

export default Verifyemail