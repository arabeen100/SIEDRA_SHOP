import Stepper from "../Stepper"
import PayPalCheckout from "../PayPalCheckout"
import { useGetPaymentInfoQuery } from "../../features/api/apiSlice"
import ProtectedStep from "../ProtectedStep";
const Checkout = () => {
const{data:paymentInfo}=useGetPaymentInfoQuery(localStorage.getItem("orderId")||"",{skip:!localStorage.getItem("orderId")});
  return (
    <ProtectedStep from="confirm" redirectTo="/cart">
    <div className=" pt-29 md:pt-20 w-[95%] md:w-[768px] lg:w-[976px] xl:w-[1440px] mx-auto flex flex-col items-center justify-center gap-3 xl:min-h-[800px]">
    <div className="w-full bg-white  p-2 lg:grid lg:place-content-center   rounded-lg">
      <Stepper />
    </div>
     <div className="w-full bg-white  p-2 rounded-lg">
       <PayPalCheckout
        clientId="AcNNQaNIKfPYnENiuVXVDi8Sn36nNIBbXD7-1vLFb352lbnywG7LCmpE8INRpFusJp-iny3gY9Y7mt3s"
        amount={paymentInfo?.data?.total_amount.toString()||"0"}
        currency="EUR"
        description="Cool Product"
        onError={(err) => {
          console.error("Payment Error:", err);
        }}
      />
     </div>
    
    </div>
    </ProtectedStep>
  )
}

export default Checkout