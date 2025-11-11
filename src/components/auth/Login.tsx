import{ useState } from "react";
import { useTranslation } from "react-i18next"
import { Eye,EyeOff } from "lucide-react";
import { SpinnerCircular } from "spinners-react";
import { apiSlice, useLogInMutation } from "../../features/api/apiSlice";
import{ Link,useNavigate} from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxTyped";
import { setToken,setItem } from "../../features/login/token";
const Login = () => {
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const[login,{isLoading,error}]=useLogInMutation();
  const { t ,i18n} = useTranslation();
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [showPassword,setShowPassword]=useState<boolean>(false);
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("user_identifier",email);
      formData.append("password",password);

      try {
        const response=await login(formData).unwrap();
        if(response.status){
          dispatch(setToken(response.data.token));
          dispatch(setItem());
          dispatch(apiSlice.util.invalidateTags(["profile","cart","wishlist"]));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
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
           <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t("form.password")}</label>
           <div className="relative">
              <input
               required
               value={password}
               onChange={(e)=>setPassword(e.target.value)}  
               type={showPassword?"text":"password"} name="password" id="password" className=" mt-1 p-2 block w-full border border-gray-200  rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
              <Eye onClick={()=>setShowPassword(true)}  size={17} className={`${!showPassword?"block":"hidden"}  absolute top-4 ${i18n.language==="de"? "left-[calc(100%-23px)]":"right-[calc(100%-23px)]"} text-gray-700  cursor-pointer`} />
              <EyeOff  onClick={()=>setShowPassword(false)}  size={17} className={`${showPassword?"block":"hidden"} absolute top-4 ${i18n.language==="de"? "left-[calc(100%-23px)]":"right-[calc(100%-23px)]"} text-gray-700 cursor-pointer`} />
               
           </div>
            {error&&<ul className="list-disc">
               <li className="text-red-600 text-sm">{t("forms.invalid_data")}</li>
            </ul>}
          
             <Link to={"/forgot-pass"} state={{from:"login"}} className="text-sm mb-2 text-gray-700 hover:text-gray-800 cursor-pointer">{t("form.forgot_password")}</Link>
           
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
              <p>{t("navbar.login")}</p>
             {isLoading&& <SpinnerCircular size={20} color="white" className=""/>}
            </button>
            <Link to={"/signup"} className="mt-4 text-gray-700 text-sm text-center hover:underline cursor-pointer">{t("forms.or_register")}</Link>

        </form>
      </div>
    </div>   
  )
}

export default Login