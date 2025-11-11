import Stepper from "../Stepper"
import { useGetCartQuery,useGetCouponQuery,useGetProfileQuery,useCheckOutMutation } from "../../features/api/apiSlice"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxTyped";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";
import ProtectedStep from "../ProtectedStep";
const Confirmorder = () => {
  const navigate=useNavigate();
  const[checkout,{isLoading}]=useCheckOutMutation();
  const{data:profile}=useGetProfileQuery();
  const[name,setName]=useState<string>("");
  const[email,setEmail]=useState<string>("");
  const[phone,setPhone]=useState<string>("");
  const[address,setAddress]=useState<string>("");
  const[note,setNote]=useState<string>("");
  useEffect(()=>{
    if(profile){
      setName(profile?.data?.user?.name);
      setEmail(profile?.data?.user?.email);
      setPhone(profile?.data?.user?.phone);
    }
  },[profile])
  const{coupon,apply}=useAppSelector((state)=>state.coupon)
    const{data:couponData,error}=useGetCouponQuery({coupon:coupon},{skip:!coupon||!apply});
  const{data:cart}=useGetCartQuery({do:"view"});
  const{t,i18n}=useTranslation();
   const[subtotal,setSubTotal]=useState<number>(0);
  const[shipping,setShipping]=useState<number>(0);
   useEffect(()=>{
    if(cart?.data?.cart_items){
      setSubTotal(0);
      setShipping(0);
      cart?.data?.cart_items?.forEach(item=>{setSubTotal(prev=>prev+item.total);
        setShipping(prev=>prev+item.shippingPrice)
      })
    }
  },[cart])
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("customer_name",name);
      formData.append("customer_email",email);
      formData.append("customer_phone",phone);
      formData.append("price",String(Number(((100-Number(couponData?.data?.value))/100)*(subtotal)||subtotal).toFixed(2)));
      formData.append("products",JSON.stringify(cart?.data?.cart_items));
      formData.append("address",address);
      formData.append("payment_gate","PayPal");
       formData.append("notes",note);
       if(couponData&&!error){
        formData.append("coupon",String(couponData?.data?.coupon));}


      try {
       const response= await checkout(formData).unwrap();
        if(response.status){
          navigate("/checkout",{state:{from:"confirm"}});
          localStorage.setItem("orderId",response?.data?.payment_info?.order_id);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <ProtectedStep from="cart" redirectTo="/cart">
     <div className=" pt-29 md:pt-20 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3  xl:min-h-[800px]">
    <div className="w-full bg-white  p-2 lg:grid lg:place-content-center  rounded-lg">
      <Stepper />
    </div>
    <div className="w-full flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center lg:gap-1">
    <div className="w-full flex flex-col gap-3 lg:order-2">
    <div className="w-full bg-white  py-8 px-6  rounded-lg">
      <div className="flex flex-col gap-5">
        {cart?.data?.cart_items?.map((item:any,i:number)=>
          <div key={i} className="flex items-center justify-between">
            <div className="flex  items-center gap-2 w-2/3">
              <img src={item.images[0].link} className="w-[64px] h-[64px] rounded-lg"/>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">{i18n.language==="ar"?item.name_ar:item.name_du}</p>
                <p className={` ${item.sale?.Value?"line-through text-gray-600":"text-red-600"} font-semibold`}>
                 €{Number(item.price).toFixed(2)}
                </p>
                 {item.sale?.Value&&<p className="text-red-600 font-semibold">
                  €{Number(Number(item.price)*((100-Number(item.sale?.Value))/100)).toFixed(2)}
                </p>}
              </div>
            </div>
            <p>{item.quantity} {t("checkout.items")}</p>

          </div>
        )}

      </div>

    </div>
    <div className="w-full bg-white  p-6  rounded-lg flex flex-col gap-4">
      <p className="text-purple-600 text-xl font-semibold">{t("checkout.summary")}</p>
      <p className="text-gray-600 text-lg">{t("checkout.price_note")}</p>
      <div className="text-lg flex justify-between">
        <p className="font-semibold text-purple-600">{t("cart.subtotal")}:</p>
        <p className="text-gray-600">€{subtotal.toFixed(2)}</p>
      </div>
      <div className="text-lg flex justify-between">
        <p className="font-semibold text-purple-600">{t("cart.shipping")}:</p>
        <p className="text-gray-600">€{shipping.toFixed(2)}</p>
      </div>
      <div className="text-lg flex justify-between">
        <p className="font-semibold text-purple-600">{t("cart.total")}:</p>
        <div className="flex flex-col gap-1.5 items-end">
        <p className={`${apply&&couponData&&!error?"line-through text-gray-600":"text-gray-600"}`}>€{(subtotal+shipping).toFixed(2)}</p>
        {apply&&couponData&&!error&&<p className="font-semibold text-purple-600">€{((((100-Number(couponData?.data?.value))/100)*(subtotal))+shipping).toFixed(2)}</p>}
        </div>
      </div>

    </div>
    </div>
    <div className="w-full bg-white lg:order-1 p-6  rounded-lg flex flex-col gap-4">
      <p className="text-purple-600 text-xl font-semibold">{t("cart.place_order")}</p>
      <form onSubmit={handleSubmit} className="text-gray-700">
          <label htmlFor="name" className="block text-sm font-medium  text-gray-700">{t("form.name")}</label>
          <input
          required
            value={name}
            onChange={(e)=>setName(e.target.value)} 
          type="text" name="name" id="name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  /> 
           <label htmlFor="email" className="block text-sm font-medium  text-gray-700">{t("form.email")}</label>
          <input
           required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
           type="email" name="email" id="email" className=" mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
           <label htmlFor="phone" className="block text-sm font-medium  text-gray-700">{t("form.phone")}</label>
          <input
          required
            value={phone}
            onChange={(e)=>setPhone(e.target.value)} 
           type="text" name="phone" id="phone" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0" />
             <label htmlFor="address" className="block text-sm font-medium  text-gray-700">{t("address")}</label>
          <input
          required
            value={address}
            onChange={(e)=>setAddress(e.target.value)} 
          type="text" name="address" id="address" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  /> 
           <label htmlFor="note" className="block text-sm font-medium  text-gray-700">{t("form.note")}</label>
           <textarea 
           rows={5}
            value={note}
            onChange={(e)=>setNote(e.target.value)}         
            name="note" id="note" className=" mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-black focus:border-2 focus:ring-black vs:text-sm mb-5 outline-0"  />
            <p className="text-sm font-medium">{t("checkout.payment_by")} :</p>
            <div className="w-32 h-12 border-2 rounded-lg border-purple-600 py-1 px-6 mt-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img src="	https://siedra-shop.grizi7.com/b8913e23f130c0f5dfc2.png" className="object-cover object-center"/>
            </div>
              <button type="submit" className=" mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center gap-2 cursor-pointer">
                <p>{t("checkout.pay_now")}</p>
                {isLoading&& <SpinnerCircular size={20} color="white"/>}
              </button>

         
      </form>

    </div>
    </div>


    </div>
    </ProtectedStep>
  )
}

export default Confirmorder