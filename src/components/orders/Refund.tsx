import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SpinnerCircular } from "spinners-react";
import { useRefundMutation } from "../../features/api/apiSlice";
import { toast } from "react-toastify";
const Refund = () => {
  const [refund,{isLoading,error}]=useRefundMutation();
  const[email,setEmail]=useState<string>("");
  const[orderNumber,setOrderNumber]=useState<string>("");
  const[note,setNote]=useState<string>("");
      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("order_id",orderNumber);
        formData.append("email",email);
        formData.append("notes",note);
  
        try {
          const response=await refund(formData).unwrap();
          if(response.status){
            toast.success(t("return_request_success"));
            setEmail("");
            setNote("");
            setOrderNumber("");
         
          }
        } catch (error) {
          console.log(error);
        }
      }
  const {t}=useTranslation();
  return (
    <div className="pt-33" >
      <div className=" w-[95%] md:w-[500px] flex-col flex items-center rounded-xl py-13 px-3 mx-auto h-fit bg-white">
        <img src=" 	https://siedra-shop.eu/88e908bfd66060b639ab.webp" alt="logo" className="mx-auto w-[100px] h-[82.359px] " loading="lazy"/>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[70%] mt-3 px-3 ">
         
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("form.email")}</label>
          <input 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
           required
           type="email" name="email" id="email" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
          <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">{t("form.order_number")}</label>
          <input 
            value={orderNumber}
            onChange={(e)=>setOrderNumber(e.target.value)}
           required
           type="number" name="orderNumber" id="orderNumber" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">{t("form.note")}</label>
          <textarea 
            value={note}
            onChange={(e)=>setNote(e.target.value)}
           required
            name="note" id="note" className=" mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
            {error&&<ul className="list-disc">
               <li className="text-red-600 text-sm">{t("invalid_order_number")}</li>
            </ul>}
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
          <p>{t("form.return_reason")}</p>
          {isLoading&& <SpinnerCircular size={20} color="white" className=""/>}
          </button>
        </form>
      </div>  

    </div>
  )
}

export default Refund