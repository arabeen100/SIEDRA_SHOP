import Stepper from "../Stepper"
import { Trash } from "lucide-react"
import { useGetCartQuery, useLazyGetCartQuery,useGetCouponQuery } from "../../features/api/apiSlice"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Cart = () => {
  const[coupon,setCoupon]=useState<string>("");
  const[apply,setApply]=useState<boolean>(false);
  const{data:couponData,error,isFetching}=useGetCouponQuery({coupon:coupon},{skip:!coupon||!apply});
  const[subtotal,setSubTotal]=useState<number>(0);
  const[shipping,setShipping]=useState<number>(0);
  const[triggerCart]=useLazyGetCartQuery();
  const{data:cart}=useGetCartQuery({do:"view"});
  const{i18n,t}=useTranslation();
  useEffect(()=>{
     if(error){
      setApply(false);
      toast.error(t("enter_valid_coupon"))
     }else if(apply&&couponData&&!error&&!isFetching){
      toast.success(t("coupon_applied"))
     }
  },[error,couponData,apply,isFetching])
  useEffect(()=>{
    if(cart){
      console.log(cart)
    }
  },[cart])
  useEffect(()=>{
    if(!cart?.data?.cart_items){
      setShipping(0);
      setSubTotal(0);
    }
  },[cart])
  useEffect(()=>{
    if(cart?.data?.cart_items){
      setSubTotal(0);
      setShipping(0);
      cart?.data?.cart_items?.forEach(item=>{setSubTotal(prev=>prev+item.total);
        setShipping(prev=>prev+item.shippingPrice)
      })
    }
  },[cart])
    const handleAddToCart=async(cartItem:any)=>{
         if(cartItem.quantity<cartItem.count){
             try {
                const response= await triggerCart({do:"update",product:{...cartItem,quantity:cartItem.quantity+1},id:cartItem.cart_id}).unwrap();
                if(response.status){
                 await triggerCart({do:"view"});
                }
             } catch (error) {
                 console.log(error)
                 
             }
            }else{
                toast.error(`${t("only_available")} ${cartItem.count} ${t("piece_in_stock")}`)
            }
          }
          const handleDeleteCart=async(cartId:number)=>{
        
             try {
                const response= await triggerCart({do:"remove",id:cartId}).unwrap();
                if(response.status){
                 await triggerCart({do:"view"});
                }
             } catch (error) {
                 console.log(error)
                 
             }
          }
         const handleRemoveFromCart=async(cartItem:any)=>{
             if(cartItem.quantity>1){
             try {
                const response= await triggerCart({do:"update",product:{...cartItem,quantity:cartItem.quantity-1},id:cartItem.cart_id}).unwrap();
                if(response.status){
                 await triggerCart({do:"view"});
                }
             } catch (error) {
                 console.log(error)
                 
             }
            }else{
              handleDeleteCart(cartItem.cart_id)
            }
          }

          
           
  return (
   <div className=" pt-29 md:pt-20 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3 ">
    <div className="w-full bg-white lg:grid lg:place-content-center p-4  rounded-lg">
      <Stepper />
    </div>
    <div className="bg-white rounded-lg  w-full py-4 px-4 sm:px-8">
      <table className={`w-full text-center border-separate border-spacing-x-4  border-spacing-y-5 ${!cart?.data?.cart_items&& "md:border-spacing-x-12"} `}>
       <thead className="w-full">
        <tr className="text-gray-500 text-sm sm:text-base w-full">
          <th className={`w-1/3 md:w-1/4 lg:w-3/20 ${i18n.language==="ar"?"text-right":"text-left"}`}>{t("image")}</th>
          <th className={`w-1/3 md:w-1/4 lg:w-1/5 ${i18n.language==="ar"?"text-right":"text-left"}`}>{t("product")}</th>
          {cart?.data?.cart_items&&<th className="w-[30%] max-lg:hidden"></th>}
          <th className={` md:w-1/4 lg:w-1/5 ${i18n.language==="ar"?"text-right":"text-left"} max-md:hidden`}>{t("quantity")}</th>
          <th className={` md:w-1/4 ${i18n.language==="ar"?"text-right":"text-left"} max-md:hidden`}>{t("price")}</th>
          <th className={`w-2/3 md:w-1/4 lg:w-1/5 ${i18n.language==="ar"?"text-right":"text-left"}`}></th>
        </tr>
       </thead>
       <tbody className="w-full">
         {cart?.data?.cart_items?.map((item:any, i: number) => (
          <tr
            key={i}
            className="bg-white text-sm sm:text-base w-full"
          >
          {/* صورة المنتج */}
             <td className="grid place-content-center w-1/3 md:w-1/4">
               <div className="w-17 h-17 grid place-content-center sm:w-29 sm:h-29">
                 <img
                  src={item.images[0].link}
                  alt={item.name_du}
                  className="object-cover object-center rounded"
                 />
              </div>
             </td>

          {/* تفاصيل المنتج */}
             <td className={` w-1/3 md:w-1/4 lg:w-1/5 ${i18n.language==="ar"?"text-right":"text-left"}`}>
               <p className="font-medium text-gray-800">
                {i18n.language === "ar" ? item.name_ar : item.name_du}
               </p>
               <div className="flex gap-2 items-center">{item.selectedColor&&<div className="w-4 h-4 rounded-full " style={{backgroundColor:item.selectedColor}}></div>} 
               {item.selectedSize&&<p>| {item.selectedSize} |</p>} 
               </div>

              <p className={`md:hidden ${item.sale?.Value?"line-through text-gray-600":"text-red-600"}   sm:text-lg font-semibold`}>
                 €{Number(item.price).toFixed(2)}
              </p>
              {item.sale?.Value&&<p className="md:hidden  text-red-600 sm:text-lg font-semibold">
                  €{Number(Number(item.price)*((100-Number(item.sale?.Value))/100)).toFixed(2)}
              </p>}
               <div className=" md:hidden flex items-center gap-3 mt-2">

               
                <button onClick={()=>{handleRemoveFromCart(item)
                }}
                  className="border border-purple-600 cursor-pointer text-purple-600 rounded-md px-2 py-1 md:px-4 md:py-3 sm:px-3 sm:py-2  hover:bg-purple-600 hover:text-white"
                >
                  -
                </button>
                 <span>{item.quantity}</span>
                 <button onClick={()=>handleAddToCart(item)}
                   className="border border-purple-600 cursor-pointer text-purple-600 rounded-md px-2 py-1 md:px-4 md:py-3 sm:px-3 sm:py-2 hover:bg-purple-600 hover:text-white"
                 >
                   +
                </button>
              </div>
            </td>
            {cart?.data?.cart_items&&<td className="w-[30%] max-lg:hidden"></td>}
            <td className={`max-md:hidden w-1/4 lg:w-1/5 ${i18n.language==="ar"?"text-right":"text-left"}`}>
              <div className="  flex items-center gap-3 mt-2">

               
                <button onClick={()=>handleRemoveFromCart(item)}
                  className="border border-purple-600 cursor-pointer text-purple-600 rounded-md px-2 py-1 md:px-4 md:py-3 sm:px-3 sm:py-2  hover:bg-purple-600 hover:text-white"
                >
                  -
                </button>
                 <span>{item.quantity}</span>
                 <button onClick={()=>handleAddToCart(item)}
                   className="border border-purple-600 cursor-pointer text-purple-600 rounded-md px-2 py-1 md:px-4 md:py-3 sm:px-3 sm:py-2 hover:bg-purple-600 hover:text-white"
                 >
                   +
                </button>
              </div>
            </td>
            <td className={`max-md:hidden w-1/4 lg:w-1/5 ${i18n.language==="ar"?"text-right":"text-left"}`}>
              <p className={` ${item.sale?.Value?"line-through text-gray-600":"text-red-600"}   sm:text-lg font-semibold`}>
                 €{Number(item.price).toFixed(2)}
              </p>
              {item.sale?.Value&&<p className="text-red-600 sm:text-lg font-semibold">
                  €{Number(Number(item.price)*((100-Number(item.sale?.Value))/100)).toFixed(2)}
              </p>}
               <p className="text-xs whitespace-nowrap text-gray-500 ">{t("product.plus")} €{item.shippingPrice}
               </p>
                <span className="whitespace-nowrap text-gray-500 text-xs">{t("product.shipping_cost")}</span>
            </td>

          {/* زر الحذف */}
            <td className={`${i18n.language==="ar"?"text-left":"text-right"} w-2/3 md:w-1/4 lg:w-1/5`}>
             <button onClick={()=>{handleDeleteCart(item.cart_id)}} className="cursor-pointer text-red-500 hover:text-red-700">
              <Trash size={20} />
            </button>
            </td>
          </tr>
        ))}
        </tbody>
      
      </table>
      {!cart?.data?.cart_items&&<p className="text-center text-gray-600 text-lg">{t("cart.empty")}</p>}
      </div>
     <div className="w-full flex flex-col gap-3 md:flex-row md:gap-1">
     <div className="bg-white rounded-lg md:w-[50%] w-full p-4 flex flex-col gap-3">
      <div className="text-lg flex justify-between">
        <p className="font-semibold">{t("cart.subtotal")}:</p>
        <p>€{subtotal.toFixed(2)}</p>
      </div>
      <div className="text-lg flex justify-between">
        <p className="font-semibold">{t("cart.shipping")}:</p>
        <p>€{shipping.toFixed(2)}</p>
      </div>
      <div className="text-lg flex justify-between">
        <p className="font-semibold">{t("cart.total")}:</p>
        <div className="flex flex-col gap-1.5 items-end">
        <p className={`${apply&&couponData&&!error?"line-through text-gray-600":"text-black"}`}>€{(subtotal+shipping).toFixed(2)}</p>
        {apply&&couponData&&!error&&<p className="font-semibold text-purple-600">€{(((100-Number(couponData?.data?.value))/100)*(subtotal+shipping)).toFixed(2)}</p>}
        </div>
      </div>

      </div>
      <div className="bg-white rounded-lg  w-full p-6  flex flex-col gap-5 sm:flex-row sm:justify-between">
        <form onSubmit={(e)=>{
          e.preventDefault();
          setApply(true);
          
        }} className="mx-auto sm:mx-0 flex flex-col gap-3.5 sm:gap-2 w-[80%] sm:w-[50%]">
          {(!apply||error||!couponData)&&<label htmlFor="coupon">{t("cart.coupon_code")}</label>}
          {(!apply||error||!couponData)&&<input
          className="w-full rounded-lg focus:border-2 focus:border-black p-2 text-sm outline-0 border border-gray-300 text-gray-800"
          required
          placeholder={t("cart.enter_coupon")}
          id="coupon"
          name="coupon"
          type="text"
          value={coupon}
          onChange={(e)=>setCoupon(e.target.value)}
          />}
          {(!apply||error||!couponData)&&<button type="submit"  className="cursor-pointer rounded-lg p-2.5 border transition-colors duration-300 border-purple-600 text-purple-600 w-full hover:bg-purple-600 hover:text-white">{t("cart.apply")}</button>}
          {apply&&couponData&&!error&&<button  onClick={()=>{setApply(false);
            setCoupon("");
          }} className="cursor-pointer rounded-lg p-2.5 border transition-colors duration-300 border-red-600 text-red-600 w-full hover:bg-red-600 hover:text-white">Remove Coupon</button>}

        </form>
        <div className="flex flex-col gap-5 justify-center sm:gap-6.5">
        <Link to={"/products"} className=" text-purple-600 transition-colors duration-300 w-full grid place-content-center p-2.5 rounded-lg border border-purple-600 hover:bg-purple-600 hover:text-white">{t("cart.continue_shopping")}</Link>
        {cart?.data?.cart_items&&<Link to={"/confirm-order"} className="text-white w-full grid place-content-center p-2.5 rounded-lg bg-purple-600 ">{t("cart.place_order")}</Link>}
        </div>

      </div>
      </div>


    </div>
  )
}

export default Cart