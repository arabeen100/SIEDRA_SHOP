import { Globe, ShoppingBag, Heart, User, Store, Home ,Menu,Search,LogIn,ShoppingCart, Undo2,ArrowUpLeft} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link ,useNavigate} from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import { useLocation,useParams } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../hooks/reduxTyped";
import { setItem, setToken } from "../features/login/token";
import { setSearch } from "../features/filters/filtersSlice";
import { useLogOutMutation } from "../features/api/apiSlice";
import { toast } from "react-toastify";
import { useGetWishListQuery ,useGetSearchProductsQuery,useGetCartQuery} from "../features/api/apiSlice";


const Navbar = () => {
 const{data:cartItems}=useGetCartQuery({do:"view"});
  const{search}=useAppSelector((state)=>state.filters);
 const {name}=useParams();
   const{data:searchProducts}=useGetSearchProductsQuery
   ({name:search});
   const products = Array.isArray(searchProducts?.data?.products) 
  ? searchProducts.data.products 
  : [];
  const navigate=useNavigate();
  const {data:wishlist}=useGetWishListQuery({do:"view"});
  const [logout]=useLogOutMutation();
  const dispatch=useAppDispatch();
  const{token}=useAppSelector((state)=>state.token);
  const { pathname } = useLocation();
   const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openAccount, setOpenAccount] = useState<boolean>(false);
    const [openAccount2, setOpenAccount2] = useState<boolean>(false);
   const toggleMenu = (): void => setOpenMenu(!openMenu); 
    const toggleAccount = (): void => setOpenAccount(!openAccount); 
     const toggleAccount2 = (): void => setOpenAccount2(!openAccount2); 
  const { t ,i18n} = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);
     const accountRef = useRef<HTMLDivElement>(null);
     const searchRef = useRef<HTMLDivElement>(null);
     useEffect(()=>{
      if(pathname!==`/search/${name}`)
      dispatch(setSearch(""));
     },[pathname])
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
    useEffect(() => {
    const handleClickOutside3 = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) { 
        dispatch(setSearch(""));
      }
    };
    document.addEventListener("mousedown", handleClickOutside3);
    return () => {
     document.removeEventListener("mousedown", handleClickOutside3);
    };
  }, []);
  const handleLogout=async()=>{
    try {
      const response=await logout().unwrap();
      if(response.status){
        dispatch(setToken(""));
        dispatch(setItem());
        toast.info(t("logout_success"));
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
      <nav className="fixed top-0 w-full bg-white z-50 flex justify-evenly items-center p-3 vs:justify-center vs:gap-7 lg:gap-3  ">
        <div className="relative z-20 text-left  lg:hidden" ref={menuRef} >
          <button onClick={toggleMenu}  className="hover:bg-[#02241033] w-11 h-11  rounded-lg grid place-content-center cursor-pointer active:scale-95 transition-transform shadow-2xl bg-gray-100">
              <Menu color="gray" size={20}/>
          </button>
        {openMenu && (
        <div className={`origin-top-right absolute  ${i18n.language==="ar"?"right-0":"left-0"} top-16 mt-2 vs:w-[280px] sm:w-[374px] md:w-[264px] rounded-lg shadow-xl bg-white  `}>
          <div className="py-1 flex flex-col gap-3.5">
            <Link to={`/`} onClick={()=>setOpenMenu(false)} className="flex  px-4 py-2  text-sm text-gray-700  hover:bg-purple-200 rounded-md w-full text-left gap-1 group active:bg-purple-700 active:text-white">
              <Home className="group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500 group-active:text-white" size={18}/>
              <p className="group-focus:text-purple-500 text-gray-500 group-active:text-white group-hover:text-purple-500">{t("navbar.home")}</p>
        
            </Link>
            <Link onClick={()=>setOpenMenu(false)} to={`/products`} className="flex active:bg-purple-700 px-4 py-2 text-sm text-gray-700 hover:bg-purple-200 w-full rounded-md text-left gap-1 group">
               <Store className="group-active:text-white group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
               <p className="group-active:text-white group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.shop")}</p>
              
            </Link>
            <div className="relative  text-left  lg:hidden" >
            <button  className="flex px-4 py-2 text-sm text-gray-700 hover:bg-purple-200 w-full rounded-md  text-left gap-1 group cursor-pointer active:bg-purple-700" onClick={()=>{toggleAccount();
            }}>
                <User className="group-active:text-white group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
                <p className="group-active:text-white group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.account")}</p>
        
             </button>
             {openAccount && (
               <div className={`mt-2 vs:w-[280px] sm:w-[374px] md:w-[264px] rounded-lg  bg-white  `}>
              {!token&&<div className="py-1 flex flex-col gap-1">
                <Link onClick={()=>setOpenMenu(false)} className={`flex active:bg-purple-700 place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 ${i18n.language==="ar"?"pr-10":"pl-10"}`} to={`/login`} >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.login")}</p>
                </Link>
                <Link onClick={()=>setOpenMenu(false)} className={`flex active:bg-purple-700 place-items-center gap-1.5 group ${i18n.language==="ar"?"pr-5":"pl-5"}  hover:bg-purple-200 py-1.5 rounded-md`} to={`/signup`} >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.register")}</p>
                </Link>
              </div>}
              {token&&
               <div className="py-1 flex flex-col gap-1">
                <Link onClick={()=>setOpenMenu(false)} className={`flex active:bg-purple-700 place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 ${i18n.language==="ar"?"pr-10":"pl-10"}`} to={`/profile`} >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.profile")}</p>
                </Link>
                <Link onClick={()=>setOpenMenu(false)} className={`flex active:bg-purple-700 place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 ${i18n.language==="ar"?"pr-10":"pl-10"}`} to={`/myorders`} >
                  <ShoppingCart className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.orders")}</p>
          
                </Link>
                <Link onClick={()=>setOpenMenu(false)} className={`flex active:bg-purple-700 place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 ${i18n.language==="ar"?"pr-10":"pl-10"}`} to={`/refund`} >
                  <Undo2 className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.returns")}</p>
                </Link>
                <button onClick={()=>{setOpenMenu(false);
                handleLogout();

                }} className={`flex active:bg-purple-700 place-items-center gap-1.5 group ${i18n.language==="ar"?"pr-10":"pl-10"}  hover:bg-purple-200 py-1.5 rounded-md cursor-pointer`}  >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.logout")}</p>
                </button>

              </div>
              }
              </div>
             )}  
             </div>
             <Link onClick={()=>setOpenMenu(false)} to={`/wishlist`} className={`flex  active:bg-purple-700 px-4 py-2 text-sm text-gray-700 hover:bg-purple-200  rounded-md  w-full text-left gap-1 group`}>
                 <Heart className="group-active:text-white group-focus:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
                <p className="group-active:text-white group-focus:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.favorites")}</p>
        
             </Link>
          </div>
        </div>
      )}
        </div>
        <Link to={`/`} className="flex flex-col gap-1 group max-lg:hidden items-center lg:order-4">
          <Home className={`group-focus:text-purple-500 group-hover:text-purple-500 ${pathname==="/"?"text-purple-500 ": "text-gray-500"} `}size={18}/>
          <p className={`${pathname==="/"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500`}>{t("navbar.home")}</p>
        
        </Link>
          <Link to={`/products`} className="flex flex-col gap-1 group max-lg:hidden items-center lg:order-5">
          <Store className={`${pathname==="/products"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500`}size={18}/>
          <p className={`${pathname==="/products"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500`}>{t("navbar.shop")}</p>
        
        </Link>
        <div ref={accountRef} className="relative z-20 text-left max-lg:hidden  lg:order-6" >
            <button className=" active:scale-95 transition-transform flex flex-col gap-1 group max-lg:hidden items-center cursor-pointer" onClick={toggleAccount2}>
                <User className="group-active:text-purple-500 group-hover:text-purple-500 text-gray-500" size={18}/>
                <p className="group-active:text-purple-500 text-gray-500 group-hover:text-purple-500">{t("navbar.account")}</p>
        
             </button>
             {openAccount2 && (
               <div className={`origin-top-right absolute  ${i18n.language==="ar"?"right-0":"left-0"} top-12  mt-2 w-[192px] rounded-lg  bg-white  `}>
              {!token&&<div className="py-1 flex flex-col gap-1">
                <Link onClick={()=>setOpenAccount2(false)} className={`flex active:bg-purple-700 place-items-center gap-1.5 group w-full rounded-md hover:bg-purple-200 py-1.5 px-1.5 `} to={`/login`} >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.login")}</p>
                </Link>
                <Link  onClick={()=>setOpenAccount2(false)} className={`flex px-1.5 active:bg-purple-700 place-items-center gap-1.5 group   hover:bg-purple-200 py-1.5 rounded-md`} to={`/signup`} >
                  <LogIn className=" group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.register")}</p>
                </Link>
              </div>}
              {token&&
               <div className="py-1 flex flex-col gap-1">
                <Link onClick={()=>{setOpenMenu(false);
                setOpenAccount2(false)

                }} className={`flex px-1.5 active:bg-purple-700 place-items-center gap-1.5 group   hover:bg-purple-200 py-1.5 rounded-md`} to={`/profile`} >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.profile")}</p>
                </Link>
                <Link onClick={()=>{setOpenMenu(false);
                setOpenAccount2(false)

                }} className={`flex px-1.5 active:bg-purple-700 place-items-center gap-1.5 group   hover:bg-purple-200 py-1.5 rounded-md`} to={`/myorders`} >
                  <ShoppingCart className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.orders")}</p>
          
                </Link>
                <Link onClick={()=>{setOpenMenu(false);
                setOpenAccount2(false)

                }} className={`flex px-1.5 active:bg-purple-700 place-items-center gap-1.5 group   hover:bg-purple-200 py-1.5 rounded-md`} to={`/refund`} >
                  <Undo2 className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.returns")}</p>
                </Link>
                <button onClick={()=>{setOpenMenu(false);
                handleLogout();
                setOpenAccount2(false);

                }} className={`flex px-1.5 active:bg-purple-700 place-items-center gap-1.5 group   hover:bg-purple-200 py-1.5 rounded-md`}  >
                  <LogIn className="group-active:text-white group-hover:text-purple-500 text-gray-700" size={15}/>
                  <p className="group-active:text-white group-hover:text-purple-500 text-gray-600 text-sm">{t("navbar.logout")}</p>
                </button>

              </div>
              }
              
              </div>
             )}  
          </div>
        <Link to={`/wishlist`} className="relative flex flex-col gap-1 group max-lg:hidden items-center lg:order-7">
          <Heart className={ `  ${pathname==="/wishlist"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500`} size={18}/>
          {wishlist?.data?.wishlist_items&&<p className=" grid place-content-center absolute bottom-9 right-2.5 w-4 h-4 text-xs rounded-full bg-purple-700 text-white">{wishlist?.data?.wishlist_items?.length}</p>}
          <p className={`${pathname==="/wishlist"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500`}>{t("navbar.favorites")}</p>
        
        </Link>
        <Link className="relative lg:flex lg:flex-col lg:items-center lg:gap-1  lg:order-8 group" to={"/cart"}>
          <ShoppingBag className={`${pathname==="/cart"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500`}size={18}/>
          {cartItems?.data?.cart_items&&<p className=" grid place-content-center absolute bottom-2.5 left-2.5 lg:bottom-9 lg:left-5 w-4 h-4 text-xs rounded-full bg-purple-700 text-white">{cartItems?.data?.cart_items?.length}</p>}
             <p className={`${pathname==="/cart"?"text-purple-500 ": "text-gray-500"} group-focus:text-purple-500 group-hover:text-purple-500 max-lg:hidden `}>{t("navbar.cart")}</p>
        </Link>
        <button className="lg:order-8 flex order-last flex-col gap-1  items-center gap-.5 cursor-pointer text-gray-500 hover:text-purple-500 group" onClick={()=>{
            i18n.changeLanguage(i18n.language === 'ar' ? 'de' : 'ar'); }}>
             <Globe size={17} className=" text-gray-500 group-hover:text-purple-500  "/>
             <p className="text-sm text-gray-500 group-hover:text-purple-500  ">
              {t("navbar.language")}
             </p>
              
         </button>
        <div className=" max-lg:hidden order-3 w-[33vw] bg-white"></div>

 
         <Link className="lg:order-1" to={"/"}>
            <img src="	https://siedra-shop.eu/88e908bfd66060b639ab.webp" alt="logo" className="h-[50Px] min-w-[108px] object-contain  " />  
         </Link>
         {pathname!==`/search/${name}`&&<div className={`  w-[95%] h-10  fixed  top-18  left-[2.5%] md:static md:w-60 lg:order-2`}>
          <input
          value={search}
          onChange={(e)=>dispatch(setSearch(e.target.value))}
           className={`  border border-gray-300  w-full bg-white rounded-3xl p-2  outline-0 focus:border-gray-500`}
          id='search'
          role='searchBox'
          type='text'
          placeholder={t("navbar.search")}
        />
        <Search className={` relative  bottom-7 ${i18n.language==="de"?"left-[91%]":"right-[91%]"}`} size={15} color="gray"/>
       
        </div>}
      
         {search&&pathname!==`/search/${name}`&&<div ref={searchRef} className={` overflow-y-auto fixed z-10 top-29 lg:w-[45%] ${i18n.language==="ar"?"lg:right-[6%] min-[1440px]:right-[15%]":"min-[1440px]:left-[15%] lg:left-[6%]"}  min-[1440px]:w-[35%]  md:top-20 p-4 w-[95%] bg-white rounded-2xl flex flex-col gap-3`}>
        {products.length?( 
          products.map(product=>
          <Link onClick={()=>{
            dispatch(setSearch(""));
          }} to={`product/${product.name_du}`} className={` flex justify-between`} key={product.id}>
            <div className="flex gap-4 items-center">
               <img src={product.images[0]?.link} className="w-12 h-12"/>
               <div className="flex flex-col ">
                <p className={`text-sm text-gray-600 ${name&&name===product.name_du?"text-purple-600":""}`}>{i18n.language==="ar"?product.name_ar:product.name_du}</p>
                <p className="text-xs text-gray-400">{i18n.language==="ar"?product.category?.name_ar:product.category?.name_du}</p>
               </div>
            </div>
            <div className="flex gap-7 items-center">
              <p className={`text-sm font-bold hidden sm:block ${name&&name===product.name_du?"text-purple-600":""}`}>€{product.price}</p>
              <ArrowUpLeft size={19} className="text-purple-600 "/>


            </div>
          </Link>)):
          <p className="text-center py-1">{t("no_products_found")}</p>
        }
        {products.length>0&&<Link  className="w-full px-2 py-2 text-purple-600 border border:purple-600 hover:text-white hover:bg-purple-600 rounded-lg text-sm transition-colors duration-200 grid place-content-center" to={`search/${search}`}>
        Show All Products 
        </Link>}
        </div>
        }
    
      
       
    
       
      </nav>

  )
}

export default Navbar