import { ChevronDown, X } from "lucide-react"
import { useAppSelector } from "../hooks/reduxTyped"
import { useAppDispatch } from "../hooks/reduxTyped"
import { setCompleteChange, setEnabled, setRange, toggleExpanded } from "../features/sidebar/sideBar";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../features/api/apiSlice";
import { useEffect, useState } from "react";
import { Link ,useLocation,useParams} from "react-router-dom";
import Slider from "rc-slider"
import "rc-slider/assets/index.css";
import { setColor,setSize,setSort,setMinPrice,setMaxPrice  } from "../features/filters/filtersSlice";
const Sidebar = ({products,sales}:any) => {
  const{name}=useParams();
  const{color,size,minPrice,maxPrice}=useAppSelector((state)=>state.filters)
  const{range}=useAppSelector((state)=>state.sideBar)
  const[allProducts,setAllProducts]=useState<any>(null);
  const {pathname}=useLocation(); 
    const{enabled}=useAppSelector((state)=>state.sideBar)
    const[priceClicked,setPriceClicked]=useState<boolean>(false);
     const[ColorClicked,setColorClicked]=useState<boolean>(false);
     const [openCategoryId, setOpenCategoryId] = useState<number |string| null>(null);
    const{data:categories}=useGetCategoriesQuery();
    const{i18n,t}=useTranslation();
    const dispatch=useAppDispatch();
    const{expanded}=useAppSelector((state)=>state.sideBar);
      const toggleCategory = (id: number|string) => {
    setOpenCategoryId(id); 

  };
  useEffect(()=>{
    if(!enabled&&products){
       setAllProducts(products)
      
    }else if(enabled&&sales){
       setAllProducts(sales);
    }
  },[enabled,products,sales])
  useEffect(()=>{
    dispatch(setColor(""));
    dispatch(setSize(""));
    dispatch(setSort(""));
    dispatch(setEnabled(false));
    dispatch(setCompleteChange(false));
    dispatch(setRange([0,0]))
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(0)); 
  },[pathname,name]); 
    useEffect(()=>{
    if(allProducts&& minPrice===0 && maxPrice===0){
      dispatch(setRange([0,0]));
    }
  },[allProducts,pathname])
  useEffect(()=>{
    if(allProducts?.data?.filters&&range[0]===0&&range[1]===0){
        dispatch(setRange([allProducts?.data?.filters?.min_price,allProducts?.data?.filters?.max_price]))};
   /*   }else if(allProducts?.data?.products?.length===0){
      dispatch(setRange([products?.data?.filters?.min_price,products?.data?.filters?.max_price]))
    } */
  },[allProducts,products,pathname,range])
  useEffect(()=>{
    dispatch(setRange([0,0]));
    dispatch(setCompleteChange(false));
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(0));
  },[enabled])

       useEffect(()=>{
             if(expanded){
                  document.body.classList.add("overflow-hidden");
              }else{
                 document.body.classList.remove("overflow-hidden");
              }
               return ()=>{
                  document.body.classList.remove("overflow-hidden");
              }
      
       },[expanded])


  return (
    <>
     {expanded && (
       <div
      onClick={() => dispatch(toggleExpanded())}
      className="fixed inset-0 bg-black/50  z-55"
        />
    )}
    
    <aside className={ `flex flex-col items-center h-full  bg-white  transition-all md:rounded-lg overflow-y-auto duration-300 md:static fixed ${i18n.language==="ar"?" right-0":"left-0"} top-0 z-60 w-[300px] ${expanded ? "  translate-x-0" : `${i18n.language==="de"? "md:translate-x-0 -translate-x-full":"translate-x-full md:translate-x-0"}`}`}>
      <div className="flex flex-col items-center w-[95%]">
        <X onClick={()=>dispatch(toggleExpanded())} size={22} className={`md:hidden text-black relative cursor-pointer top-6 ${i18n.language==="ar"?"right-[120px]":"left-[120px]"}`}/>
         <p className="p-5 self-start text-xs md:text-[16px] font-bold text-gray-600">{t("shop.categories")}</p>
      </div>
         <ul className=" border  border-gray-200 divide-y divide-gray-200   w-[80%] mt-3   rounded-lg">
            {categories?.data?.categories?.map((category)=>
                <li key={category.id} className={` flex flex-col justify-center gap-2  `}>
                    <div className="flex justify-between px-3 py-3 items-center">
                    <Link to={`/category/${category.name_du}`} className=" text-xs md:text-[16px] font-bold text-gray-600">{i18n.language==="ar"?category.name_ar:category.name_du}</Link>
                    <ChevronDown onClick={()=>{toggleCategory(category.id);}} className= {`transition-transform duration-300 ${
                      openCategoryId === category.id ? "rotate-180 cursor-dafault" : "cursor-pointer "
                    }`} size={18}/>
                    </div>
                    {openCategoryId===category.id&&
                     <ul  className={` transition-all duration-300 overflow-hidden ${openCategoryId === category.id ? "max-h-40 opacity-100 translate-y-2 " : "max-h-0 opacity-0 -translate-y-2"}`}>
                        {category.subs?.map((sub)=>
                            <li className={`text-xs md:text-sm pb-3 pr-4  text-gray-600 
                           `}>
                              <Link to={`/sub-category/${sub.name_du}`}>- {i18n.language==="ar"?sub.name_ar:sub.name_du}</Link>  
                            </li>
                        )}
                     </ul>
                    }
                </li>
            )}
         </ul>
          {allProducts?.data?.filters?.sizes?.length>0&& <div className="flex flex-col w-[80%] border border-gray-200 rounded-lg  mt-10 gap-4.5 px-3">
            <p className=" text-xs md:text-[16px] font-bold text-gray-600 pt-2">{t("size")}</p>
          <div className="flex gap-3 pb-2">
              {allProducts?.data?.filters?.sizes.map((sizee:string,i:number)=>
                <div onClick={()=>{
                        dispatch(setSize(sizee));
                }
                }  key={i} className={`${sizee===size&&"border-purple-600"} border text-xs md:text-[16px] border-gray-300 rounded-sm p-2 cursor-pointer `}>{sizee}</div>)}
              

            </div>

         </div>}
         <div className="flex flex-col w-[80%] border border-gray-200 rounded-lg  mt-10 py-2">
            <div className="flex justify-between px-3">
            <p className=" text-xs md:text-[16px] font-bold text-gray-600 ">{t("price")}</p>
            <ChevronDown onClick={()=>setPriceClicked(!priceClicked)} size={18}  className= {` cursor-pointer transition-transform duration-300 ${
                      priceClicked ? "rotate-180 " : ""}`}/>
            </div>
            {priceClicked &&
            <div className={`w-full  px-5 pt-5`}>
            <Slider
            reverse
            range
            min={Number(allProducts?.data?.filters?.min_price)}
            max={Number(allProducts?.data?.filters?.max_price)}
            value={range}
            onChange={(value) => {
                
               dispatch(setRange(value as [number, number]));
              }}
            onChangeComplete={(value) => {
   
             const [min, max] = value as [number, number];
             dispatch(setCompleteChange(true))
             dispatch(setMinPrice(min));
             dispatch(setMaxPrice(max));
             }}
             styles={{
               track: {
              backgroundColor: "#7c3aed",
               height: 6
             },
             handle: {
               backgroundColor: "#7c3aed",
             border: "none",
               height: 20,
              width: 20,
               marginTop: -7,
              },
             rail: {
              backgroundColor: "#e5e7eb",
              height: 6
             }
          }}
             />
            <div className="flex justify-between mt-4 text-sm text-purple-600 font-semibold">
              <span>{Number(range[0]).toFixed(2)}</span>
              <span>{Number(range[1]).toFixed(2)}</span>
            </div>

            </div>
            }
            

         </div>
         {allProducts?.data?.filters?.colors?.length>0&&<div className="flex flex-col w-[80%] border border-gray-200 rounded-lg  mt-10 py-2">
           <div className="flex justify-between px-3">
            <p className=" text-xs md:text-[16px] font-bold text-gray-600 ">{t("color")}</p>
            <ChevronDown onClick={()=>setColorClicked(!ColorClicked)} size={18}  className= {` cursor-pointer transition-transform duration-300 ${
                      ColorClicked ? "rotate-180 " : ""}`}/>
           </div>
           {ColorClicked&&<div className="flex flex-wrap gap-2 pt-5 px-5">
            {allProducts?.data?.filters?.colors?.map((colour:string,i:number)=>

             <div onClick={()=>{
             
              dispatch(setColor(`${colour.slice(1)}`));
             }}  key={i} className={`${colour.slice(1)===color&&"border border-gray-600 "} cursor-pointer w-8 h-8 bg-gray-200 grid place-content-center rounded-full`}> <div  className="w-4 h-4 rounded-full" style={{backgroundColor:colour}}></div></div>
            )}
           </div>}

         </div>}
          <div className="flex justify-between px-3 w-[80%] mt-10 pb-10">
              <p className=" text-xs md:text-[16px] font-bold text-gray-600 ">{t("home.discounted_products")}</p>
              <button
                 onClick={() => dispatch(setEnabled(!enabled))}
                 className={`relative cursor-pointer ${i18n.language==="ar"?"inline-flex flex-row-reverse":"inline-flex"} h-6 w-9 items-center rounded-full transition-colors border border-gray-400 duration-400 ${
                 enabled ? "bg-purple-600" : "bg-white"
                }`}
              >
                <span
                className={`inline-block h-4 w-4 transform rounded-full  transition-transform duration-400 ${
                enabled ? "bg-white translate-x-3.5" : "bg-gray-400 translate-x-1"
                 }`}
                 />
              </button>


          </div>


    </aside>
    </>
    
  )
}

export default Sidebar