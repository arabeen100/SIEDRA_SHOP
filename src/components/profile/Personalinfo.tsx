import Profilecard from "./Profilecard"
import { useGetProfileQuery } from "../../features/api/apiSlice"
import { Phone,Mail } from "lucide-react";
const Personalinfo = () => {
  const{data:profile}=useGetProfileQuery();
  return ( 
    <div className="pt-33 w-[95%] md:pt-23 md:w-[750px] lg:w-[958px] min-[1440px]:w-[1422px] mx-auto min-[1440px]:flex min-[1440px]:items-center min-[1440px]:justify-center min-[1440px]:gap-5 min-[1440px]:pt-52 min-[1440px]:pb-43 xl:min-h-[800px]">
      <Profilecard/>
      <div className="w-full bg-white rounded-2xl flex flex-col justify-center items-center gap-3 pb-25 min-[1440px]:pb-6 min-[1440px]:pt-6 min-[1440px]:w-[1107.2px] mt-3">
        <div className="flex max-[1440px]:hidden items-center gap-2.5 pt-5">
            <div className="relative grid place-content-center w-16 h-16 rounded-full bg-purple-600 text-lg">
             <p className="text-white">{profile?.data?.user?.name?.split(" ").map(word=>word[0]).join("")}</p>
             <div className=" absolute top-1 right-1 w-2.5 h-2.5 border border-white rounded-full bg-green-600"></div>
            </div>
        </div>    
        <p className="text-3xl sm:text-4xl text-center pt-25 min-[1440px]:pt-4 font-semibold text-gray-800 mb-10">{profile?.data?.user?.name}</p>
        <p className="text-purple-600 text-lg">{profile?.data?.user?.username}@</p>
        <p className="flex flex-row-reverse items-center gap-3 text-gray-700 ">{profile?.data?.user?.email}<Mail size={18}/></p>
          <p  className="flex flex-row-reverse items-center gap-3 text-gray-700 ">{profile?.data?.user?.phone}  <Phone size={18}/></p>
      </div>
    </div>
  )
}

export default Personalinfo