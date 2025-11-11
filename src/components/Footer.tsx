import { useState } from "react";
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useContactMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/reduxTyped";
const Footer = () => {
  const{token}=useAppSelector((state)=>state.token)
  const { t ,i18n} = useTranslation();
  const[name,setName]=useState<string>("");
  const[email,setEmail]=useState<string>("");
  const[message,setMessage]=useState<string>("");
  const[contact]=useContactMutation();
  const handleSubmitContact=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("message",message);
    try {
     const response= await contact(formData).unwrap();
      if(response.status){
        toast.success(t("forms.message_sent_success"),{
          className:"bg-white text-gray-600 text-lg",
          progressClassName:"bg-green-600",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <footer className={`w-full  bg-white mt-25  pt-5 ${i18n.language==="de"?"pl-14":"pr-14"}  sm:flex sm:flex-col min-[701px]:justify-around min-[701px]:flex-row pb-5 `}>
      <div className="sm:flex sm:justify-between min-[701px]:justify-around min-[701px]:w-2/3 ">
       <Link to={"/"}>
            <img src="	https://siedra-shop.grizi7.com/88e908bfd66060b639ab.webp" alt="logo" className="w-[150px] h-[123.531px] " loading="lazy"/>
       </Link>
      <div className={`${i18n.language==="de"?"sm:pr-14":"sm:pl-14"}`}  >
        <p className="font-bold text-gray-600 py-5 ">Siedra Shop</p>
        <ul className="style-none flex flex-col gap-2  text-sm">
          <li ><Link className="hover:underline"  to={"/"}>{t("navbar.home")}</Link></li>
          <li ><Link className="hover:underline" to={"/products"}>{t("navbar.shop")}</Link></li>
          <li ><Link className="hover:underline" to={`${token?"/profile":"/login"}`}>{t("navbar.account")}</Link></li>
           <li ><Link className="hover:underline" to={"/myorders"}>{t("footer.orders")}</Link></li>
          <li ><Link className="hover:underline" to={"/refund"}>{t("footer.returns")}</Link></li>
        </ul>
      </div>
      </div>

      <div className="min-[701px]:w-1/3" >
        <p className="font-bold text-gray-600 py-5">{t("form.contact_us")}</p>
        <form onSubmit={handleSubmitContact} className="w-full flex flex-col gap-2.5">
          <input type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
           placeholder={t("form.name")} className="text-sm border border-gray-300 rounded-md w-2/3 p-2   mb-3 outline-0 focus:border-black focus:border-2"/>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
          type="email" placeholder={t("form.email")} className="text-sm border border-gray-300 rounded-md w-2/3 p-2   mb-3 outline-0 focus:border-black focus:border-2"/>
          <textarea
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          placeholder={t("form.message")} className="text-sm border border-gray-300 rounded-md w-2/3 p-2    mb-3 outline-0 focus:border-black resize-none focus:border-2"/>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md w-2/3 hover:bg-purple-700  ">{t("form.contact_us")}</button>
        </form>
      </div>

    </footer>
    )
}

export default Footer