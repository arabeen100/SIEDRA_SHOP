import {Swiper,SwiperSlide}from "swiper/react"
import"swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination ,Autoplay} from 'swiper/modules';
import { useGetCarouselsQuery,useGetCategoriesQuery,useGetRecommendationsQuery ,useGetMostVisitedQuery,useGetSalesQuery} from "../features/api/apiSlice";
import { useTranslation } from "react-i18next";
import { ChevronRight,ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Productcard from "./Productcard";
const Home = () => {
  const{data:sales}=useGetSalesQuery({limit:10});
  const{data:mostVisited}=useGetMostVisitedQuery({limit:10});
  const {data:recommendations}=useGetRecommendationsQuery({limit:12});
  const {t,i18n}=useTranslation();
  const {data:carousels}=useGetCarouselsQuery();
  const {data:categories}=useGetCategoriesQuery();
  const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
const slides =
  categories?.data?.categories?.length && categories.data.categories.length <= 4
    ? [...categories.data.categories, ...categories.data.categories] // duplicate
    : categories?.data?.categories || [];
  return (
    <div className=" pt-33 md:pt-23 ">
      <div className="relative md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto ">
      <Swiper 
      key={i18n.language}
      dir={i18n.language==="ar"?"rtl":"ltr"}
       modules={[Navigation,Pagination,Autoplay]}
        navigation={{
           nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        slidesPerView={1}
        loop={true}
        autoplay={{delay:3000,disableOnInteraction:false}}
        speed={1000}
        pagination={{clickable:true}}
      >
        {carousels?.data?.carousels?.map(carousel=>
          <SwiperSlide className="w-fit h-fit  "  key={carousel.ID}>
            <div className="relative w-[95%] md:w-[768px] lg:w-[976px] lg:h-[549.891px] md:h-[432.688px] xl:w-[1440px] xl:h-[811.312px] h-[52vw] mx-auto rounded-2xl xl:min-h-[800px]">
              <img className='w-full h-full rounded-2xl object-center object-cover brightness-70 ' src={carousel.Image_link} />
              <div  className={`w-[60%] absolute text-white sm:top-[40%] z-50 top-[20%] left-[20%] ${carousel.ID!==2&&"hidden" } text-center `}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">{t("home.shop_and_get_offers")}</p>
               <p className="text-sm mt-2">{t("home.eu_shipping")}</p>
               </div>
            </div>

          </SwiperSlide>
        )}

      </Swiper>
       <button className={`z-30 cursor-pointer custom-prev absolute left-2 md:left- top-1/2 -translate-y-1/2  text-white  `}>
        <ChevronLeft size={50}/>
      </button>
      <button className="z-30 cursor-pointer custom-next absolute right-2 top-1/2 -translate-y-1/2  text-white">
        <ChevronRight size={50} />
      </button>
      </div>
      <div className="w-[95%] mx-auto  md:w-[768px] lg:w-[976px]  xl:w-[1440px]  mt-10">
        <div className="flex w-full justify-between" >
          <p className="text-lg font-bold text-gray-700">{t("home.explore_categories")}</p>
          <div className={`${i18n.language==="ar"?"pl-2":"pr-2"} ${i18n.language==="ar"&&"flex-row-reverse"}  min-[1025px]:hidden flex gap-4`}>
              <button className="cursor-pointer custom2-prev p-1 rounded-full bg-gray-500 text-white ">
                <ChevronLeft  size={24}/>
               </button>
                <button className="cursor-pointer custom2-next p-1 rounded-full bg-gray-500 text-white">
                 <ChevronRight size={24} />
                </button>

          </div>
        </div>
      <Swiper 
       className="w-full min-[1025px]:w-[92%]  mt-5 "
          key={i18n.language}
          dir={i18n.language==="ar"?"rtl":"ltr"}
          modules={[Navigation,Autoplay]}
          navigation={{
           nextEl: ".custom2-next",
           prevEl: ".custom2-prev",
           
        }}
       
        breakpoints={{
          768:{slidesPerView:4},
          1025:{
            autoplay:false,
            slidesPerView:4,
            allowTouchMove:false,
           
          }
        }}
        spaceBetween={5}
        slidesPerView={3}
        loop={true}
        autoplay={{delay:3000,disableOnInteraction:false}}
        speed={1000}
      >
        {slides.map((category,i)=>
          <SwiperSlide  key={i}>
            <Link className="w-full grid place-content-center " to={`/category/${category.name_du}`}>
              <img className="w-[85px]  h-[85px] sm:w-full sm:h-[150px] md:w-[150px] object-center object-cover  rounded-full border-4 border-white " src={category.Image_link} />
            </Link>
            <p className="text-center">{truncateText((i18n.language==="ar"?category.name_ar:category.name_du),10)}</p>

          </SwiperSlide>
        )}


      </Swiper>
      </div>
      <div className="w-[95%] mx-auto  md:w-[768px] lg:w-[976px]  xl:w-[1440px]  mt-10">
        <p className="text-lg font-bold text-gray-700">{t("home.recommended_for_you")}</p>
        <div className="mt-5  flex flex-wrap gap-3">
        {recommendations?.data?.products?.map(product=>
        <div key={product.id} className="w-[calc(50%-6px)] md:w-[calc(25%-9px)] xl:w-[calc(20%-9.6px)]" >
          <Productcard  product={product}/>
        </div>  
        )}
        </div>
      </div>
      <div className="mt-10 md:w-[768px] lg:w-[976px] xl:w-[1440px] w-[95%] mx-auto max-h-[300px] ">
        <img src="https://siedra-shop.grizi7.com/public/uploads/images/categories-images/8584_%D8%A7%D8%AF%D9%88%D8%A7%D8%AA%20%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9%20%D8%BA%D9%84%D8%A7%D9%81.jpg" className="w-full object-cover object-center rounded-2xl h-[230px] sm:h-[300px] " loading="lazy"/>
        <p className="text-lg font-bold text-gray-700 mt-5  ">{t("home.discounted_products")}</p>
      </div>
      {sales?.data?.products&&sales?.data?.products?.length>0&&<div className={`relative w-[95%] mx-auto  md:w-[768px] lg:w-[976px]  xl:w-[1440px]  mt-8 sm:mt-20`}>
         <Swiper 
           key={i18n.language}
           dir={i18n.language==="ar"?"rtl":"ltr"}
           modules={[Navigation,Autoplay]}
           navigation={{
              nextEl: ".custom4-next",
              prevEl: ".custom4-prev",
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
               {sales?.data?.products?.map(product=>
                <SwiperSlide key={product.id}>
                   <Productcard  product={product}/>
               </SwiperSlide>  
        )}


         </Swiper>
         <button className={`z-30 cursor-pointer custom4-prev absolute left-2 md:left- top-1/2 -translate-y-1/2  text-white p-1 bg-[#0000008a] rounded-full`}>
        <ChevronLeft size={20}/>
        </button>
        <button className="z-30 cursor-pointer custom4-next absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-[#0000008a] text-white rounded-full">
        <ChevronRight size={20} />
        </button>
      </div>}
      <div className="mt-10 md:w-[768px] lg:w-[976px] xl:w-[1440px] w-[95%] mx-auto max-h-[300px] ">
        <img src="https://siedra-shop.grizi7.com/public/uploads/images/categories-images/196_%D8%A7%D8%AF%D9%88%D8%A7%D8%AA%20%D9%85%D9%86%D8%B2%D9%84.jpg" className={`w-full object-cover object-center rounded-2xl h-[230px] sm:h-[300px] ${sales?.data?.products?"mt-0":"sm:mt-18"}`} loading="lazy" />
        <p className="text-lg font-bold text-gray-700 mt-5">{t("home.new_products")}</p>
      </div>
       <div className="relative w-[95%] mx-auto  md:w-[768px] lg:w-[976px]  xl:w-[1440px] mt-8 sm:mt-20">
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
       <div className="mt-10 md:w-[768px] lg:w-[976px] xl:w-[1440px] w-[95%] mx-auto max-h-[300px] ">
        <img src="https://siedra-shop.grizi7.com/public/uploads/images/categories-images/1288_%D8%B1%D8%AC%D8%A7%D9%84%D9%8A.webp" className="w-full object-cover object-center rounded-2xl h-[230px] sm:h-[300px] " loading="lazy" />
        <p className="text-lg font-bold text-gray-700 mt-5">{t("home.most_visited_products")}</p>
       </div>
       <div className="w-[95%] mx-auto  md:w-[768px] lg:w-[976px]  xl:w-[1440px]  sm:mt-20 mt-8 flex flex-wrap gap-3">
        {mostVisited?.data?.products?.map(product=>
        <div key={product.id} className="w-[calc(50%-6px)] md:w-[calc(25%-9px)] xl:w-[calc(20%-9.6px)]" >
          <Productcard  product={product}/>
        </div>  
        )}
        </div>
       
   



    </div>
  )
}

export default Home