import { Heart } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useLazyGetWishListQuery,useGetWishListQuery} from "../features/api/apiSlice";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/reduxTyped";
import { useEffect,useState } from "react";
const Productcard:React.FC<any> = ({product}) => {
   
 const[isFavorite,setIsFavorite]=useState<any>(false);
    const [triggerWishlist] = useLazyGetWishListQuery();
    const{token}=useAppSelector((state)=>state.token);
    const{i18n,t}=useTranslation();
      const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
const {data:wishlist}=useGetWishListQuery({do:'view'});
  const isInWishlist = wishlist?.data?.wishlist_items?.some((wishlistItem) => wishlistItem.id === product.id);

  useEffect(()=>{
   
      setIsFavorite(isInWishlist);

  },[isInWishlist])
 
const handleToogle=async(productName:string)=>{
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
 return (
    <div className="bg-white rounded-2xl shadow-sm  p-3 flex flex-col items-center gap-3 relative w-full ">
      
      <button onClick={()=>{handleToogle(product.name_du);
         setIsFavorite(!isFavorite)
      }} className="cursor-pointer absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100">
        <Heart size={18} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"} />
      </button>
      {product?.sale?.Value&&<div className="absolute top-3 left-4 text-white bg-red-600 p-1 rounded-lg text-xs">
        -{product?.sale?.Value}%
      </div>}

      
      <Link to={`/product/${product.name_du}`}  className="w-full flex justify-center">
      {product?.images?.map((image:any,i:any)=>
        <img key={i}
          src={image.link}
          alt={product.name_du}
          className="w-[180px] h-[180px] object-cover object-center"
        />

      )}
      </Link>

  
      <Link to={`/product/${product.name_du}`} className="text-center flex flex-col gap-1">
        <p className="text-sm text-gray-500 whitespace-nowrap">{truncateText(i18n.language==="ar"? product.category.name_ar:product.category.name_du,10)}</p>
        <p className="text-sm font-medium text-gray-800 whitespace-nowrap">{truncateText(i18n.language==="ar"? product.name_ar:product.name_du,10)}</p>
        <div className="flex justify-center gap-2 mt-2">
           { product?.sale?.Value&&<p className="text-sm font-bold text-gray-900">
            €{Number(product.price*((100-product?.sale?.Value)/100)).toFixed(2)}
           </p>}
        <p className={`${product?.sale?"line-through  text-gray-400":"text-gray-900"} text-sm font-bold `}>
          €{Number(product.price).toFixed(2)}
        </p>
       
        </div>
        <div className={`${product.colors.length<=0&&"bg-white mt-6.25"} flex gap-1 justify-center `}>
            {product.colors?.map((color:any,i:number)=>
                <div key={i} style={{backgroundColor:color}} className="w-6 h-6 rounded-full"></div>
            )}
        </div>
      </Link>
    </div>
  );
};


export default Productcard