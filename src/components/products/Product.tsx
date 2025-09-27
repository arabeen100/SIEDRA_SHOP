import { useParams } from "react-router-dom"
import { useGetProductQuery,useGetRecommendationsQuery } from "../../features/api/apiSlice"
import { useTranslation } from "react-i18next";
import Countdown from "../Countdown";
import { Heart, PackageX, ShoppingBag, Truck ,ChevronLeft,ChevronRight} from "lucide-react";
import { useState,useEffect } from "react";
import {Swiper,SwiperSlide}from "swiper/react"
import { Navigation ,Autoplay} from 'swiper/modules';
import"swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Productcard from "../Productcard";
import { useLazyGetWishListQuery,useGetWishListQuery,useLazyGetCartQuery ,useGetProductsQuery} from "../../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTyped";
import { toast } from "react-toastify";
import{setProducts,setToLocalStorage} from "../../features/product/products"
import { useRef } from "react";
const Product = () => {
  const{data:allProducts}=useGetProductsQuery({limit:13});
  const {products}=useAppSelector((state)=>state.products);
  const dispatch=useAppDispatch();
  const[count,setCount]=useState<number>(1);
  const[isFavorite,setIsFavorite]=useState<any>(false);
  const[triggerCart]=useLazyGetCartQuery();
   const [triggerWishlist] = useLazyGetWishListQuery();
   const {data:wishlist}=useGetWishListQuery({do:'view'});
  const{token}=useAppSelector((state)=>state.token);
  const{t,i18n}=useTranslation();
  const {name}=useParams();
  const{data:product}=useGetProductQuery({name:name?.replace(/\s+/g, "-")});
    const isInWishlist = wishlist?.data?.wishlist_items?.some((wishlistItem) => wishlistItem.id === product?.data?.product?.id);
  const{data:recommendations}=useGetRecommendationsQuery({limit:12});
  const[selectedColor,setSelectedColor]=useState<any>("");
   const[selectedSize,setSelectedSize]=useState<any>("");
    const[selectedDimension,setSelectedDimension]=useState<any>("");
     const prevCountsRef = useRef<any>(null);
   useEffect(() => {
  if (product) {
    setSelectedColor(product?.data?.product?.colors?.[0]);
    setSelectedSize(product?.data?.product?.sizes?.[0]);
    setSelectedDimension(product?.data?.product?.dimensions?.[0]);
    setCount(1);
  }
}, [product]);
useEffect(()=>{
    if (!allProducts || !allProducts.data || !Array.isArray(allProducts.data.products)) {
    return;
  } 

   const newCountsArr = allProducts.data.products.map((p: any) => ({
    id: p.id,
    count: Number(p.count ?? 0),
  }));
  let isCountsChanged = false;
const prev= JSON.parse(localStorage.getItem("prevCountsRef")||"null")
if (prev) {
  const normalize = (arr: any[]) =>
    [...arr].sort((a, b) => a.id - b.id);

  const prevNormalized = JSON.stringify(normalize(prev));
  const newNormalized = JSON.stringify(normalize(newCountsArr));

  isCountsChanged = prevNormalized !== newNormalized;
}

prevCountsRef.current = newCountsArr;
localStorage.setItem("prevCountsRef",JSON.stringify(prevCountsRef.current))
const isProductsEmpty = JSON.parse(localStorage.getItem("products")||"[]").length === 0|| (Array.isArray(products) && products.length === 0);
   const normalize = (arr:any) => 
  [...arr].sort((a, b) => a.id - b.id);
    const isDifferent=JSON.stringify(normalize(newCountsArr))!==JSON.stringify(normalize(products));
    if(isDifferent){
      if(isCountsChanged||isProductsEmpty){
      dispatch(setProducts(newCountsArr));
      dispatch(setToLocalStorage());}
    }else if(!isDifferent||isProductsEmpty){
      dispatch(setProducts(newCountsArr));
      dispatch(setToLocalStorage());
    }
},[allProducts])





useEffect(()=>{
  dispatch(setToLocalStorage());
},[products])
    useEffect(()=>{
       
         setIsFavorite(isInWishlist);
       
     },[isInWishlist])
   const handleToogle=async(productName:any)=>{
      if(token){
       if(isInWishlist){
           try {
              const response= await triggerWishlist({do:"remove",product:productName}).unwrap();
              if(response.status){
               toast.error(t("removed_from_favorites"))
             
               await triggerWishlist({do:"view"});
              }
           } catch (error) {
               console.log(error)
               
           }
   
       }else{
           try {
                const response=   await triggerWishlist({do:"add",product:productName}).unwrap();
              if(response.status){
               toast.info(t("added_to_favorites"));
             
               await triggerWishlist({do:"view"});
              }
           } catch (error) {
               console.log(error);
                 setIsFavorite((prev:any)=>!prev)
              
           }
       }
         
      }else{
        toast.error(t("please_login_first"))
      }
   }
    const handleAddToCart=async(productt:any,id:any)=>{
      
      if(token){
           try {
              const response= await triggerCart({do:"add",product:{...productt,quantity:count,selectedColor:selectedColor,selectedSize:selectedSize,selectedDimension:selectedDimension}}).unwrap();
              if(response.status){
               toast.success(t("added_to_cart"));
               await triggerCart({do:"view"});
                  const updatedProducts:any=products?.map((p)=>p.id===id?{id:p.id,count:Number(p.count)-count}:p);
                  dispatch(setProducts(updatedProducts));
                  dispatch(setToLocalStorage());
              }
           } catch (error) {
               toast.error(t("out_of_stock"))
               console.log(error)
               
           }
          }else{
            toast.error(t("please_login_first"))
          }
         
   }


  return (
    <div className=" pt-29 md:pt-23 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3 xl:min-h-[800px] ">
      <div className="w-full bg-white rounded-lg p-4">
        <p className=" font-semibold">{i18n.language==="de"?product?.data?.product?.name_du:product?.data?.product?.name_ar}</p>
      </div>
      <div className="w-full flex flex-col gap-3 justify-center items-center md:w-full md:flex-row md:justify-between md:items-start md:gap-1">
      <div className="w-full md:w-[40%] flex flex-col gap-1 md:gap-70 items-center justify-center bg-white rounded-lg p-4 md:justify-between">
        <div className="w-[90%] md:w-[80%] sm:w-[380px] grid place-content-center ">
        <img src={product?.data?.product?.images[0].link} className="object-cover object-center "/>
        </div>
        <div className="w-[75px] h-[100px]">
        <img  src={product?.data?.product?.images[0].link} className="border-3 border-blue-500  object-cover object-center "/>
        </div>
      </div>
      <div className="w-full md:w-[60%] flex flex-col gap-3">
      <div className="w-full flex flex-col gap-3 md:order-2 bg-white rounded-lg p-4">
        {product?.data?.product?.sale?.Value&&<div className=" text-white w-fit bg-red-600 p-1 rounded-lg ">
        -{product?.data?.product?.sale?.Value}%
      </div>}
      <p className={`${product?.data?.product?.sale?.Value?"line-through text-gray-600":"text-purple-600"}  text-gray-600 text-lg md:text-3xl font-semibold`}>
          €{Number(product?.data?.product?.price).toFixed(2)}
      </p>
      {product?.data?.product?.sale?.Value&&<p className=" text-purple-600 text-lg md:text-3xl font-semibold">
            €{Number(Number(product?.data?.product?.price)*((100-Number(product?.data?.product?.sale?.Value))/100)).toFixed(2)}
      </p>}
      <p className="text-gray-600 text-sm md:text-[16px]">{t("product.plus")} €{product?.data?.product?.shippingPrice} {t("product.shipping_cost")}</p>
         {product?.data?.product?.sale?.Value&&<Countdown endDate={product?.data?.product?.sale?.End_Date}/>}
      </div>
      <div className="w-full flex flex-col gap-3 md:order-1 justify-center bg-white rounded-lg p-4">
        {product?.data?.product?.colors&&product?.data?.product?.colors?.length>0&&
        <div>
        <p className="font-semibold md:text-lg">{t("color")} :</p>
        <div className="flex gap-2 mt-3">
          {product?.data?.product?.colors?.map((color:string,i:number)=>
          <div onClick={()=>setSelectedColor(color)} key={i} className={`${(selectedColor===color)&&"border border-gray-700"}  grid place-content-center  w-8 h-8 md:w-10 md:h-10 rounded-full bg-white cursor-pointer`}>
          <div   className={`w-5.5 h-5.5 md:w-7.5 md:h-7.5 rounded-full `} style={{backgroundColor:color}}></div>
          </div>
          )}
        </div>
        </div>}
         {product?.data?.product?.sizes&&product?.data?.product?.sizes?.length>0&&
         <div>
         <p className="font-semibold md:text-lg">{t("size")} :</p>
        <div className="flex gap-2 mt-3">
          {product?.data?.product?.sizes?.map((size:string,i:number,)=>
          <div key={i} onClick={()=>setSelectedSize(size)} className={`p-2 rounded-lg text-sm md:text-lg cursor-pointer ${(selectedSize===size)&&"border border-purple-600"} `}>{size}</div>
          )}
          </div>
           </div>}
          {product?.data?.product?.dimensions&&product?.data?.product?.dimensions?.length>0&&
          <div>
               <p className="font-semibold md:text-lg">{t("dimensions")} :</p>
                <div className="flex gap-2 mt-3">
                {product?.data?.product?.dimensions?.map((dimension:any,i:number,)=>
               <div key={i} onClick={()=>setSelectedDimension(dimension)} className={`p-2 rounded-lg text-sm md:text-lg cursor-pointer ${(selectedDimension===dimension)&&"border border-purple-600"} `}>{dimension}</div>
             )}
          </div>
          </div>
          }

       
       
        <div className="flex gap-3">
           <Truck size={21}/>
           <p className="text-purple-600 text-sm md:text-[16px]">{t("product.shipping_within")} {product?.data?.product?.shippingTime} {t("product.day")}</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 md:order-3 justify-center bg-white rounded-lg p-4">
        <div className=" w-full flex flex-col items-center gap-2 justify-center sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4.5 text-sm">
            <div onClick={()=>{
              if(count>1){
                setCount(count-1);
              }
            }} className="px-3.5 py-2 text-xl grid place-content-center text-purple-600 border border-purple-600 hover:text-white hover:bg-purple-600 rounded-lg cursor-pointer">-</div>
            <p>{count}</p>
            <div onClick={()=>{
              if(count<Number(products.find(p=>p.id===product?.data?.product?.id)?.count)){
                  setCount(count+1)
              }else{
                toast.error(`${t("only_available")} ${products.find(p=>p.id===product?.data?.product?.id)?.count} ${t("piece_in_stock")}`)
              }
            }}  className="px-3.5 py-2 text-xl grid place-content-center text-purple-600 border border-purple-600 hover:text-white hover:bg-purple-600 rounded-lg cursor-pointer">+</div>
          </div>
          <button onClick={()=>{
            handleAddToCart(product?.data?.product,product?.data?.product?.id);
          }} className="cursor-pointer relative flex justify-center items-center w-full sm:w-2/3 p-2 rounded-lg text-white bg-purple-600">
            <p className="text-center">{t("product.add_to_cart")}</p>
            <ShoppingBag className=" absolute left-3" size={21}/>

          </button>
        </div>
        <button onClick={()=>{handleToogle(product?.data?.product?.name_du);
         setIsFavorite(!isFavorite);

        }} className={`${isFavorite?"border-red-500":"border-purple-600"} bg-gray-200  cursor-pointer relative flex justify-center items-center w-full p-2 rounded-lg border  hover:border-gray-300 active:scale-95 transition-transform`}>
          <p>{t("product.add_to_wishlist")}</p>
          <Heart className={`${isFavorite&& "text-red-500 fill-red-500"} absolute left-3`}  size={21}/>
        </button>
        <div className="flex gap-3">
          <PackageX size={21}/>
          <p className="text-sm md:text-[16px] text-purple-600">30 {t("product.free_return_days")}</p>

        </div>
      </div>
      {(product?.data?.product?.description_ar||product?.data?.product?.description_du)&&<div className="w-full flex flex-col gap-3 md:order-4 justify-center bg-white rounded-lg p-4">
     
        <p className="text-sm text-gray-700">{i18n.language==="ar"?product?.data?.product?.description_ar:product?.data?.product?.description_du}</p>
      </div>}
      </div>
      </div>
        <p className="px-5 self-start font-semibold ">{t("home.recommended_for_you")}</p>
      <div className="relative w-[95%] mx-auto  md:w-[768px] lg:w-[976px]  xl:w-[1440px]  mt-4">
      
         <Swiper 
           key={i18n.language}
           dir={i18n.language==="ar"?"rtl":"ltr"}
           modules={[Navigation,Autoplay]}
           navigation={{
              nextEl: ".custom3-next",
              prevEl: ".custom3-prev",
             }}
             slidesPerView={2}
             spaceBetween={7}
           loop={true}
          speed={1000}
          breakpoints={{
            768:{slidesPerView:3

            },
            1440:{slidesPerView:5}
          }}
          className="w-full">
               {recommendations?.data?.products?.map(product=>
                <SwiperSlide key={product.id}>
                   <Productcard  product={product}/>
               </SwiperSlide>  
        )}


         </Swiper>
         <button className={`z-30 cursor-pointer custom3-prev absolute left-2 md:left- top-1/2 -translate-y-1/2  text-white p-1 bg-[#0000008a] rounded-full`}>
        <ChevronLeft size={20}/>
        </button>
        <button className="z-30 cursor-pointer custom3-next absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-[#0000008a] text-white rounded-full">
        <ChevronRight size={20} />
        </button>
       </div>
    

    </div>
  )
}

export default Product