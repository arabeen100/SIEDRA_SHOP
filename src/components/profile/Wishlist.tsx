import { useTranslation } from "react-i18next";
import { useGetWishListQuery } from "../../features/api/apiSlice"
import { useAppSelector } from "../../hooks/reduxTyped"
import { Link } from "react-router-dom";
import Productcard from "../Productcard";
const Wishlist = () => {
  const {token}=useAppSelector((state)=>state.token);
  const{data:wishlist}=useGetWishListQuery({do:"view"})
  const {t,i18n}=useTranslation();
  return (
    <div className="pt-31 flex flex-col justify-center items-center xl:min-h-[800px]">
      {!token&&
      <div className="flex flex-col gap-5 justify-center items-center pt-6">
        <p className="text-xl font-semibold">{t("wishlist.login_to_view")}</p>
        <Link to={"/login"} className="px-2 py-2 text-purple-600 border border:purple-600 hover:text-white hover:bg-purple-600 rounded-lg text-sm transition-colors duration-200">{t("navbar.login")}</Link>
      </div>}
      { !wishlist?.data?.wishlist_items?.length && token&& <p className="text-xl text-center pt-6 font-semibold">{t("wishlist.empty")}</p>}
      {wishlist?.data?.wishlist_items?.length&&token&&
        <div className={` justify-center items-center sm:justify-normal ${i18n.language==="ar"?"sm:pr-[2.5%]":"sm:pl-[2.5%]"} md:pr-0 flex flex-wrap gap-3 md:w-[768px] lg:w-[976px] min-[1440px]:w-[1440px]`}>
          {wishlist?.data?.wishlist_items?.map(wishlistItem=>
            <div className={`w-[95%] sm:w-[calc(50%-15px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-9px)] `} key={wishlistItem.id}>
              <Productcard product={wishlistItem} />
            </div>
          )}
        </div>}
      
      
    </div>
  )
}

export default Wishlist