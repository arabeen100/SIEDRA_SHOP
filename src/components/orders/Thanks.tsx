import Stepper from "../Stepper"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProtectedStep from "../ProtectedStep";
import { useAppDispatch,useAppSelector } from "../../hooks/reduxTyped";
import { setProducts,setToLocalStorage } from "../../features/product/products";
import{ useGetProductsQuery} from "../../features/api/apiSlice";
import { useEffect } from "react";
const Thanks = () => {
  const dispatch=useAppDispatch();
  const { t } = useTranslation();
  const {data:productsData}=useGetProductsQuery({limit:13});
  const{products}=useAppSelector((state)=>state.products);
  useEffect(() => {
  if (!productsData) return;
  if(products.length>0)return;
  const newCounts:any = productsData?.data?.products?.map((p: any) => ({
    id: p.id,
    count: p.count,
  }));
  dispatch(setProducts(newCounts));
  dispatch(setToLocalStorage());

}, [productsData, products, dispatch]);

  return (
    <ProtectedStep from="checkout" redirectTo="/cart">
    <div className=" pt-29 md:pt-20 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3  xl:min-h-[800px]">
    <div className="w-full bg-white  p-2 lg:grid lg:place-content-center  rounded-lg">
      <Stepper />
    </div>
    <div className="w-full bg-white  p-4 flex flex-col items-center justify-center rounded-lg">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">🎉{t("thank_you_for_order")}</h1>
      <p className="text-lg text-gray-700 mb-6">
        {t("payment_success")}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-500 transition"
      >
        {t("back_to_home")}
      </Link>

    </div>

    </div>
    </ProtectedStep>
  )
}

export default Thanks