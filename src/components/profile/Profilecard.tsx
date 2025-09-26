import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../../features/api/apiSlice";
const Profilecard = () => {
    const{data:profile}=useGetProfileQuery();
    const{pathname}=useLocation();
    const{t}=useTranslation();
  return (
    <div className="w-full rounded-2xl bg-white flex flex-col items-center   xl:w-[296.8px] xl:gap-13 gap-7">
        <div className="flex items-center gap-2.5 pt-10">
            <div className="relative grid place-content-center w-16 h-16 rounded-full bg-purple-600 text-lg">
                <p className="text-white">{profile?.data?.user?.name?.split(" ").map(word=>word[0]).join("")}</p>
                <div className=" absolute top-1 right-1 w-2.5 h-2.5 border border-white rounded-full bg-green-600"></div>
            </div>
            <div>
                <p className="text-gray-600 font-semibold">{t("hello")}</p>
                <p className="font-semibold text-purple-600" >{profile?.data?.user?.name}</p>
            </div>
        </div>
        <div className="flex xl:flex-col  gap-2 sm:gap-3 justify-center  pb-13 w-[95%]  ">
            <Link to={"/profile"} className={` text-gray-600 xl:text-sm  xl:py-1.5  text-xs hover:bg-purple-300 px-2 font-semibold text-center py-3 cursor-pointer rounded-md grid place-content-center sm:text-[16px] sm:font-medium text-gray-600 ${pathname==="/profile"&&"bg-purple-600 text-white hover:bg-purple-500"} xl:w-full `}>{t("navbar.profile")}</Link>
            <Link to={"/update-profile"} className={`${pathname==="/update-profile"&&"bg-purple-600 text-white hover:bg-purple-500"}     xl:text-sm  xl:py-1.5  text-xs hover:bg-purple-300 px-2 font-semibold text-center py-3 cursor-pointer rounded-md grid place-content-center sm:text-[16px] sm:font:medium  text-gray-600 xl:w-full  `}>{t("update_profile")}</Link>
            <Link to={"/myorders"} className={` ${pathname==="/myorders"&&"bg-purple-600 text-white hover:bg-purple-500"}      xl:text-sm  xl:py-1.5  text-xs hover:bg-purple-300 px-2 font-semibold text-center py-3 cursor-pointer rounded-md grid place-content-center sm:text-[16px] sm:font-medium text-gray-600 xl:w-full `}>{t("navbar.orders")}</Link>
        </div>

    </div>
  )
}

export default Profilecard