import Profilecard from "./Profilecard"
import { useGetUserOrdersQuery } from "../../features/api/apiSlice"
import { useTranslation } from "react-i18next";
const Myorders = () => {
  const{data:orders}=useGetUserOrdersQuery();
  const {i18n,t}=useTranslation();
  return (
  <div className="pt-33 w-[95%] md:pt-23 md:w-[750px] lg:w-[958px] min-[1440px]:w-[1422px] mx-auto min-[1440px]:flex min-[1440px]:items-center min-[1440px]:justify-center min-[1440px]:gap-5">
      <Profilecard/>
      <div className="bg-white py-7 mt-3 rounded-2xl">
      <div className=" w-[80%] overflow-x-auto overflow-y-auto mx-auto ">
      <table className=" border-collapse border-gray-200 text-sm text-right">
        <thead >
          <tr className="border-b border-gray-200">
            <th className="p-3 border-b  text-gray-600 border-gray-200 ">{t("order_number")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 whitespace-nowrap">{t("date_added")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("image")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("name")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("color")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("quantity")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("item_price")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("size")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("total")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("address")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("payment_gateway")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("payment_status")}</th>
             <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("price")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("shipping")}</th>
            <th className="p-3 border-b text-gray-600 border-gray-200 ">{t("order_status")}</th>
          </tr>
        </thead>
        <tbody>
          {orders?.data?.orders?.map((order) => (
            <tr key={order.ID} className="border-b border-gray-200 text-gray-800">
              <td className="p-3 border border-gray-200  font-bold">{order.Order_ID}</td>
              <td className="p-3 border border-gray-200 ">{order.Adding_Date}</td>
              {order?.Products?.map(product=>
              <td key={product.ID} className="p-3 border border-gray-200 ">
                <img
                  src={product.Product.image}
                  alt={product.Product.name_du}
                  className="w-15 h-15 object-cover rounded"
                />
              </td>

              )}
               {order?.Products?.map(product=>
              <td key={product.ID} className="p-3 border border-gray-200 ">{i18n.language==="ar"?product.Product.name_ar:product.Product.name_du}</td>)}
               {order?.Products?.map((product:any)=>
              <td key={product.ID} className="p-3 border border-gray-200 "><div className="w-3 h-3 rounded-full " style={{backgroundColor:product?.Color}}></div></td>)}
               {order?.Products?.map(product=>
              <td key={product.ID} className="p-3 border border-gray-200 ">{product.Count}</td>)}
              {order?.Products?.map(product=>
              <td key={product.ID} className="p-3 border border-gray-200 ">€{product.ItemPrice}</td>)}
               {order?.Products?.map(product=>
              <td key={product.ID} className="p-3 border border-gray-200 ">{product.Size}</td>)}
               {order?.Products?.map(product=>
              <td key={product.ID} className="p-3 border border-gray-200 ">€{product.Total}</td>)}
              <td className="p-3 border border-gray-200 ">{order.Address}</td>
              <td className="p-3 border border-gray-200 ">{order.Payment_Gate}</td>
              <td className="p-3 border border-gray-200 ">{order.Payment_Status}</td>
              <td className="p-3 border border-gray-200 ">€{order.Price}</td>
              <td className="p-3 border border-gray-200 ">€{order.Shipping}</td>
              <td className="p-3 border border-gray-200 ">{order.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    </div>
  )
}

export default Myorders