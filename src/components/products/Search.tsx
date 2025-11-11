import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next"
import { useGetSearchProductsQuery,useGetSalesQuery } from "../../features/api/apiSlice";
import Productcard from "../Productcard";
import { useState,useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../../hooks/reduxTyped";
import { useParams,Link } from "react-router-dom";
import { setSearch } from "../../features/filters/filtersSlice";
const Search = () => {

  const dispatch=useAppDispatch();
  const{search}=useAppSelector((state)=>state.filters);
      const{name}=useParams();
         const[allProducts,setAllProducts]=useState<any>(null);
        const{color,size,sort,minPrice,maxPrice}=useAppSelector((state)=>state.filters)
         const{enabled}=useAppSelector((state)=>state.sideBar)
        const[limit,setLimit]=useState<number>(12);
        const{data:sales,error:err}=useGetSalesQuery({color:color,size:size,sort:sort,limit:limit,offset:0,min_price:minPrice,max_price:maxPrice},{skip:!enabled});
        const{data:products,error}=useGetSearchProductsQuery({name:search.replace(" ","-")||name?.replace(" ","-"),limit:limit,offset:0});
        const{t,i18n}=useTranslation();
        
        
         useEffect(()=>{
          
           if (!enabled && products) {
               setAllProducts(products);
              } else if (enabled && sales) {
                setAllProducts(sales);
      }
        },[enabled,products,sales])
  return (
            <div className=" pt-19  w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3 xl:min-h-[800px] ">
           <div className="bg-white rounded-lg flex justify-center md:justify-start md:px-3 items-center gap-1.5 w-full py-4">
            <Link to={"/"} className="text-sm text-gray-500 hover:underline" >{t("navbar.home")}</Link>
            {i18n.language==="ar"?<ChevronLeft  className="text-gray-400" size={14}/>:<ChevronRight className="text-gray-400" size={14}/>}
            <p className="text-sm text-gray-500 hover:underline cursor-pointer">{name}</p>
    
           </div>
           <div className="flex gap-1 w-full">
           <div>
          
           </div>
           <div className="flex flex-col gap-3 w-full ">
           <img  src="https://siedra-shop.grizi7.com/public/uploads/images/categories-images/8584_%D8%A7%D8%AF%D9%88%D8%A7%D8%AA%20%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9%20%D8%BA%D9%84%D8%A7%D9%81.jpg" className=" object-cover object-center rounded-lg w-[95%] h-[230px] sm:h-[300px] mx-auto md:w-[400px] lg:w-[556px] md:h-[250px] " loading="lazy"/>
           <div className="relative mx-auto w-[88%]">
           <input
           autoFocus
          value={search}
          onChange={(e)=>dispatch(setSearch(e.target.value))}
           className={` w-full border border-gray-300   bg-white rounded-3xl p-2  outline-0 focus:border-gray-500 mx-auto`}
          id='search'
          role='searchBox'
          type='text'
          placeholder={t("navbar.search")}
        />
         <SearchIcon className={` absolute  bottom-4 ${i18n.language==="de"?"left-[94%]":"right-[94%]"}`} size={15} color="gray"/>
         </div>
           <div className="w-full flex flex-wrap gap-3">
           {!error&&!err&& allProducts?.data?.products?.map((product:any)=>
            <div key={product.id} className={`w-full  sm:w-[calc(50%-6px)] md:w-[calc(33.33%-8px)] lg:w-[calc(20%-10px)]`} >
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

export default Search