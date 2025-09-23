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
      <div className=" w-[80%] h-[520px]  overflow-x-auto overflow-y-auto mx-auto ">
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
         {orders?.data?.orders?.map((order) =>
          order?.Products?.map((product, index) => (
          <tr key={product.ID} className="border-b border-gray-200 text-gray-800">
           {index === 0 && (
          <>
            <td className="p-3 border border-gray-200 font-bold" rowSpan={order.Products.length}>
              {order.Order_ID}
            </td>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              {order.Adding_Date}
            </td>
          </>
          )}

       
            <td className="p-3 border border-gray-200">
             <img
               src={product.Product.image}
              alt={product.Product.name_du}
              className="w-15 h-15 object-cover rounded"
             />
            </td>
            <td className="p-3 border border-gray-200">
              {i18n.language === "ar" ? product.Product.name_ar : product.Product.name_du}
            </td>
            <td className="p-3 border border-gray-200">
           {product.Color ? (
               <div
                 className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: product.Color }}
               ></div>
               ) : (
                "-"
               )}
           </td>
            <td className="p-3 border border-gray-200">{product.Count}</td>
           <td className="p-3 border border-gray-200">€{product.ItemPrice}</td>
           <td className="p-3 border border-gray-200">{product.Size || "-"}</td>
          <td className="p-3 border border-gray-200">€{product.Total}</td>
          {index === 0 && (
           <>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              {order.Address}
            </td>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              {order.Payment_Gate}
            </td>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              {order.Payment_Status}
            </td>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              €{order.Price}
            </td>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              €{order.Shipping}
            </td>
            <td className="p-3 border border-gray-200" rowSpan={order.Products.length}>
              {order.Status}
            </td>
          </>
          )}
        </tr>
        ))
       )}
      </tbody>

      </table>
    </div>
    </div>

    </div>
  )
}

export default Myorders