import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next"
import { useGetSubcategoryProductsQuery,useGetSalesQuery } from "../../features/api/apiSlice";
import Productcard from "../Productcard";
import { useState,useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../hooks/reduxTyped";
import { setCompleteChange, setEnabled, setRange, toggleExpanded } from "../../features/sidebar/sideBar";
import Sidebar from "../Sidebar";
import { setMaxPrice, setMinPrice, setSort,setColor, setSize } from "../../features/filters/filtersSlice";
import { useParams,Link } from "react-router-dom";
const Subcategory = () => {
    const{name}=useParams();
       const[allProducts,setAllProducts]=useState<any>(null);
      const{completeChange}=useAppSelector((state)=>state.sideBar)
      const{color,size,sort,minPrice,maxPrice}=useAppSelector((state)=>state.filters)
       const{enabled}=useAppSelector((state)=>state.sideBar)
      const[limit,setLimit]=useState<number>(12);
      const{data:sales,error:err}=useGetSalesQuery({subcategory:name?.replace(" ","-"),color:color,size:size,sort:sort,limit:limit,offset:0,min_price:minPrice,max_price:maxPrice},{skip:!enabled});
      const{data:products,error}=useGetSubcategoryProductsQuery({subcategoryName:name?.replace(/\s+/g, "-"),color:color,size:size,sort:sort,limit:limit,offset:0,min_price:minPrice,max_price:maxPrice});
      const{t,i18n}=useTranslation();
      const dispatch=useAppDispatch();
       useEffect(()=>{
        
         if (!enabled && products) {
             setAllProducts(products);
            } else if (enabled && sales) {
              setAllProducts(sales);
    }
      },[enabled,products,sales])
  return (
        <div className=" pt-29 md:pt-23 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3  xl:min-h-[800px]">
           <div className="bg-white rounded-lg flex justify-center md:justify-start md:px-3 items-center gap-1.5 w-full py-4">
            <Link to={"/"} className="text-sm text-gray-500 hover:underline" >{t("navbar.home")}</Link>
            {i18n.language==="ar"?<ChevronLeft  className="text-gray-400" size={14}/>:<ChevronRight className="text-gray-400" size={14}/>}
            <p className="text-sm text-gray-500 hover:underline cursor-pointer">{name}</p>
    
           </div>
           <div className="flex gap-1 w-full">
           <div>
           <Sidebar err={err} products={products} sales={sales} />
           </div>
           <div className="flex flex-col gap-3 w-full ">
           <img src={products?.data?.subcategory?.category?.Cover_Image_link} className=" object-cover object-center rounded-lg w-[95%] h-[230px] sm:h-[300px] mx-auto md:w-[400px] lg:w-[556px] md:h-[250px] " loading="lazy"/>
           <div className="bg-white w-full rounded-lg flex flex-col justify-center items-end p-4 gap-3">
            <div className="flex flex-wrap items-center justify-between w-full gap-1 self-start">
              <div className="flex items-center gap-1">        
              {completeChange&&<div className="w-fit px-1.5 py-1 flex items-center justify-center gap-1.5 bg-gray-200 rounded-lg">
                <p className="text-xs text-gray-800">
                  {t("price_from")} ({minPrice}€) {t("to")} ({maxPrice}€)
                </p>
                <button className="cursor-pointer text-sm " onClick={()=>{dispatch(setCompleteChange(false));
                
                if(allProducts?.data?.filters){
                  dispatch(setRange([allProducts?.data?.filters?.min_price,allProducts?.data?.filters?.max_price]));
                  dispatch(setMinPrice(allProducts?.data?.filters?.min_price))
                  dispatch(setMaxPrice(allProducts?.data?.filters?.max_price))
                }
                  
                }}
                  
              >x</button>
                </div>}
                {color&&<div className="w-fit px-1.5 py-1 flex items-center justify-center gap-1.5 bg-gray-200 rounded-lg">
                  <p className="text-xs text-gray-800">{t("color")}:</p>
                  <div className="w-3 h-3 mr-1 rounded-full " style={{backgroundColor:`#${color}`}}></div>
                  <button onClick={()=>{dispatch(setColor(""))}} className="cursor-pointer text-sm font-semibold text-gray-800">x</button>
    
                </div>}
                {size&&<div className="w-fit px-1.5 py-1 flex items-center justify-center gap-1.5 bg-gray-200 rounded-lg">
                  <p className="text-xs text-gray-800">{t("size")}: {size}</p>
                  <button onClick={()=>dispatch(setSize(""))} className="cursor-pointer text-sm font-semibold text-gray-800">x</button>
    
                </div>}
                {enabled&&
                 <div className="w-fit px-1.5 py-1 flex items-center justify-center gap-1.5 bg-gray-200 rounded-lg">
                  <p className="text-xs text-gray-800">{t("home.discounted_products")}</p>
                  <button onClick={()=>dispatch(setEnabled(false))} className="cursor-pointer text-sm font-semibold text-gray-800">x</button>
                 </div>
                }
                {(color||size||completeChange||enabled)&&
                 <button onClick={()=>{
                    dispatch(setCompleteChange(false));
                
                   if(allProducts?.data?.filters){
                      dispatch(setRange([allProducts?.data?.filters?.min_price,allProducts?.data?.filters?.max_price]));
                      dispatch(setMinPrice(allProducts?.data?.filters?.min_price))
                      dispatch(setMaxPrice(allProducts?.data?.filters?.max_price))
                    };
                    dispatch(setColor(""));
                    dispatch(setSize(""));
                    dispatch(setEnabled(false));
                  }} className="w-fit  py-1 px-1.5 flex items-center justify-center gap-1.5 bg-gray-200 rounded-lg text-xs cursor-pointer">
                    {t("clear_filters")}
                 </button>
                }
              </div>
              <select onChange={(e)=>dispatch(setSort(e.target.value))} className=" outline-0 border border-gray-300 p-3 rounded-lg  " >
              <option value={""} disabled selected >{t("shop.sort_by")}</option>
              <option value={"low"}>{t("shop.price_low_to_high")}</option>
              <option value={"high"}>{t("shop.price_high_to_low")}</option>
              </select>
            
            </div>
            <SlidersHorizontal onClick={()=>dispatch(toggleExpanded())} className=" cursor-pointer rotate-90 text-white bg-purple-600 rounded-xl p-3 hover:bg-[#02241033] md:hidden" size={45}/>
           </div>
           <div className="w-full flex flex-wrap gap-3">
           {!error&&!err&& allProducts?.data?.products?.map((product:any)=>
            <div key={product.id} className={`w-full  sm:w-[calc(50%-6px)] lg:w-[calc(33.33%-8px)] `} >
              <Productcard product={product}/>
            </div>
           )}
        
       
           </div> 
           {(error||err)&&<p className="text-xl text-center mt-7 font-semibold">{t("no_products_found")}</p>}  
          <div className={`w-full grid place-content-center bg-white r py-3 rounded-lg mt-3  ${allProducts?.data?.products?.length&&allProducts?.data?.products?.length===12&&!error&&!enabled?"opacity-100":"opacity-0"}`}>
           <button onClick={()=>setLimit(13)} className={`cursor-pointer p-3 text-white text-sm bg-purple-600 rounded-xl  active:scale-95 transition-all duration-200 hover:bg-purple-500 `}>{t("shop.load_more")}</button>
           </div>
           </div>
           </div>
        </div>
  )
}

export default Subcategory