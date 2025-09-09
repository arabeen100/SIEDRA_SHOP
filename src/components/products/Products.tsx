import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next"
import { useGetProductsQuery } from "../../features/api/apiSlice";
import Productcard from "../Productcard";
import { useState } from "react";
const Products = () => {
  const[limit,setLimit]=useState<number>(12)
  const{data:products}=useGetProductsQuery({limit:limit,offset:0});
  const{t,i18n}=useTranslation();
  return (
     <div className=" pt-29 md:pt-23 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3 ">
       <div className="bg-white rounded-lg flex justify-center items-center gap-1.5 w-full py-4">
        <p className="text-sm text-gray-500" >{t("navbar.home")}</p>
        {i18n.language==="ar"?<ChevronLeft  className="text-gray-400" size={14}/>:<ChevronRight className="text-gray-400" size={14}/>}
        <p className="text-sm text-gray-500">{t("shop.all_products")}</p>

       </div>
       <img src="https://siedra-shop.eu/public/uploads/images/categories-images/8584_%D8%A7%D8%AF%D9%88%D8%A7%D8%AA%20%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9%20%D8%BA%D9%84%D8%A7%D9%81.jpg" className=" object-cover object-center rounded-lg w-[95%] h-[230px] sm:h-[300px]  " loading="lazy"/>
       <div className="bg-white w-full rounded-lg flex flex-col justify-center items-end p-4 gap-3">
        <select className=" outline-0 border border-gray-300 p-3 rounded-lg  " >
          <option>{t("shop.sort_by")}</option>
          <option>{t("shop.price_low_to_high")}</option>
          <option>{t("shop.price_high_to_low")}</option>
        </select>
        <SlidersHorizontal className=" rotate-90 text-white bg-purple-600 rounded-xl p-3" size={45}/>
       </div>
       <div className="flex flex-wrap gap-3">
       {products?.data?.products?.map(product=>
        <div key={product.id} className={`w-full sm:w-[calc(50%-6px)]  `} >
          <Productcard product={product}/>
        </div>
       )}
   
       </div>   

       <button onClick={()=>setLimit(13)} className={`cursor-pointer p-3 text-white bg-purple-600 rounded-xl mt-3 active:scale-95 transition-all duration-200 ${limit===13?"opacity-0":"opacity-100"}`}>{t("shop.load_more")}</button>
    </div>
  )
}

export default Products