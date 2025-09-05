import { Heart } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useLazyGetWishListQuery,useGetWishListQuery} from "../features/api/apiSlice";;
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/reduxTyped";
import { useEffect } from "react";
const Productcard:React.FC<any> = ({product}) => {
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
useEffect(()=>{
    if(wishlist){
        console.log(wishlist)
    }
})
  const isInWishlist = wishlist?.data?.wishlist_items?.some((wishlistItem) => wishlistItem.id === product.id);

 
const handleToogle=async(productName:string)=>{
   if(token){
    if(isInWishlist){
        try {
           const response= await triggerWishlist({do:"remove",product:productName});
           if(response.status){
            toast.error(t("removed_from_favorites"))
            await triggerWishlist({do:"view"});
           }
        } catch (error) {
            console.log(error)
            
        }

    }else{
        try {
             const response=   await triggerWishlist({do:"add",product:productName});
           if(response.status){
            toast.info(t("added_to_favorites"));
            await triggerWishlist({do:"view"});
           }
        } catch (error) {
            console.log(error)
        }
    }
      
   }else{
     toast.error(t("please_login_first"))
   }
}
 return (
    <div className="bg-white rounded-2xl shadow-sm  p-3 flex flex-col items-center gap-3 relative w-full ">
      
      <button onClick={()=>{handleToogle(product.name_du)}} className="cursor-pointer absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100">
        <Heart size={18} className={isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"} />
      </button>

      
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
        <p className="text-lg font-bold text-gray-900">
          €{Number(product.price).toFixed(2)}
        </p>
        <div className={`${product.colors.length<=0&&"bg-white mt-6.25"} flex gap-1 `}>
            {product.colors?.map((color:any,i:number)=>
                <div key={i} style={{backgroundColor:color}} className="w-6 h-6 rounded-full"></div>
            )}
        </div>
      </Link>
    </div>
  );
};


export default Productcard