import { Globe, ShoppingBag, Heart, User, Store, Home ,Menu,Search,LogIn,LogOut} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
const Navbar = () => {
   const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openAccount, setOpenAccount] = useState<boolean>(false);
    const [openAccount2, setOpenAccount2] = useState<boolean>(false);
   const toggleMenu = (): void => setOpenMenu(!openMenu); 
    const toggleAccount = (): void => setOpenAccount(!openAccount); 
     const toggleAccount2 = (): void => setOpenAccount2(!openAccount2); 
  const { t ,i18n} = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);
     const accountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false); 
      }
      else if (accountRef.current && !accountRef.current.contains(event.target as Node)) { 
        setOpenAccount2(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    useEffect(() => {
    const handleClickOutside2 = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) { 
        setOpenAccount2(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);
  return (
      <nav className="fixed top-0 w-full bg-white z-50 flex justify-evenly items-center p-3 vs:justify-center vs:gap-7 lg:gap-3  ">
        <div className="relative z-20 text-left  lg:hidden" ref={menuRef} >
          <button onClick={toggleMenu}  className="hover:bg-[#02241033] w-11 h-11  rounded-lg grid place-content-center cursor-pointer">
              <Menu color="gray" size={20}/>
          </button>
        {openMenu && (
        <div className={`origin-top-right absolute  ${i18n.language==="ar"?"right-0":"left-0"} top-16 mt-2 vs:w-[280px] sm:w-[374px] md:w-[264px] rounded-lg shadow-xl bg-white  `}>
          <div className="py-1 flex flex-col gap-3.5">
            <Link to={`/`} className="flex  px-4 py-2  text-sm text-gray-700  hover:bg-purple-200 rounded-md w-full text-left gap-1 group">
              <Home className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
              <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.home")}</p>
        
            </Link>
            <Link to={`/products`} className="flex px-4 py-2 text-sm text-gray-700 hover:bg-purple-200 w-full rounded-md text-left gap-1 group">
               <Store className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
               <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.shop")}</p>
              
            </Link>
            <div className="relative  text-left  lg:hidden" >
            <button className="flex px-4 py-2 text-sm text-gray-700 hover:bg-purple-200 w-full rounded-md  text-left gap-1 group cursor-pointer" onClick={toggleAccount}>
                <User className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
                <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.account")}</p>
        
             </button>
             {openAccount && (
               <div className={`mt-2 vs:w-[280px] sm:w-[374px] md:w-[264px] rounded-lg  bg-white  `}>
              <div className="py-1 flex flex-col gap-1">
                <Link className={`flex place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 ${i18n.language==="ar"?"pr-10":"pl-10"}`} to={`/login`} >
                  <LogIn className="group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.login")}</p>
                </Link>
                <Link className={`flex place-items-center gap-1.5 group ${i18n.language==="ar"?"pr-5":"pl-5"}  hover:bg-purple-200 py-1.5 rounded-md`} to={`/signup`} >
                  <LogIn className=" group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.register")}</p>
                </Link>
              </div>
              </div>
             )}  
             </div>
             <Link to={`/wishlist`} className={`flex px-4 py-2 text-sm text-gray-700 hover:bg-purple-200  rounded-md  w-full text-left gap-1 group`}>
                 <Heart className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
                <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.favorites")}</p>
        
             </Link>
          </div>
        </div>
      )}
        </div>
        <Link to={`/`} className="flex flex-col gap-1 group max-lg:hidden items-center lg:order-4">
          <Home className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
          <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.home")}</p>
        
        </Link>
          <Link to={`/products`} className="flex flex-col gap-1 group max-lg:hidden items-center lg:order-5">
          <Store className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
          <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.shop")}</p>
        
        </Link>
        <div ref={accountRef} className="relative z-20 text-left max-lg:hidden  lg:order-6" >
            <button className="flex flex-col gap-1 group max-lg:hidden items-center cursor-pointer" onClick={toggleAccount2}>
                <User className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
                <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.account")}</p>
        
             </button>
             {openAccount2 && (
               <div className={`origin-top-right absolute  ${i18n.language==="ar"?"right-0":"left-0"} top-12  mt-2 w-[192px] rounded-lg  bg-white  `}>
              <div className="py-1 flex flex-col gap-1">
                <Link className={`flex place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 `} to={`/login`} >
                  <LogIn className="group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.login")}</p>
                </Link>
                <Link className={`flex place-items-center gap-1.5 group   hover:bg-purple-200 py-1.5 rounded-md`} to={`/signup`} >
                  <LogIn className=" group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.register")}</p>
                </Link>
              </div>
              </div>
             )}  
          </div>
        <Link to={`/wishlist`} className="flex flex-col gap-1 group max-lg:hidden items-center lg:order-7">
          <Heart className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
          <p className="group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.favorites")}</p>
        
        </Link>
        <Link className="lg:flex lg:flex-col lg:items-center lg:gap-1  lg:order-8 group" to={"/cart"}>
          <ShoppingBag className="group-hover:text-purple-500 text-gray-500 group-focus:text-purple-500"  size={18}/>
             <p className="text-gray-500 max-lg:hidden group-hover:text-purple-500 group-focus:text-purple-500">{t("navbar.cart")}</p>
        </Link>
        <button className="lg:order-8 flex order-last flex-col gap-1  items-center gap-.5 cursor-pointer text-gray-500 hover:text-purple-500 group" onClick={()=>{
            i18n.changeLanguage(i18n.language === 'ar' ? 'de' : 'ar'); }}>
             <Globe size={17} className=" text-gray-500 group-hover:text-purple-500  "/>
             <p className="text-sm text-gray-500 group-hover:text-purple-500  ">
              {t("navbar.language")}
             </p>
              
         </button>
        <div className=" max-lg:hidden order-3 w-40 xl:w-115 bg-white"></div>

 
         <Link className="lg:order-1" to={"/"}>
            <img src="	https://siedra-shop.eu/88e908bfd66060b639ab.webp" alt="logo" className="h-[50Px] min-w-[108px] object-contain  " />  
         </Link>
         <div className="  w-[95%] h-10  fixed  top-18  left-[2.5%] md:static md:w-60 lg:order-2">
          <input
           className=" border border-gray-300  w-full bg-white rounded-3xl p-2  outline-0 focus:border-gray-500"
          id='search'
          role='searchBox'
          type='text'
          placeholder={t("navbar.search")}
        />
        <Search className={`relative bottom-7 ${i18n.language==="de"?"left-[91%]":"right-[91%]"}`} size={15} color="gray"/>
        </div>
   
    
      
       
    
       
      </nav>

  )
}

export default Navbar