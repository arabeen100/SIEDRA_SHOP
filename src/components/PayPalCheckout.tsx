import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom"
import { useConfirmPaymentMutation ,useGetCartQuery,useLazyGetCartQuery} from "../features/api/apiSlice";
import{ useAppDispatch} from "../hooks/reduxTyped";
import { setProducts, setToLocalStorage } from "../features/product/products";
interface PayPalCheckoutProps {
  clientId: string;
  amount: string; 
  currency?: string; 
  description?: string;
  onError?: (err: any) => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({
  clientId,
  amount,
  currency = "EUR",
  description = "Purchase",
  onError,
}) => {
  const dispatch=useAppDispatch();
  const [triggerCart]=useLazyGetCartQuery();
  const {data:cartData}=useGetCartQuery({do:"view"});
  const[confirmPayment]=useConfirmPaymentMutation();
     const navigate = useNavigate();
    const handleConfirmPayment=async(paymentId:string)=>{
      try {
        const response=await confirmPayment({order_id:localStorage.getItem("orderId")||"",payment_id:paymentId}).unwrap();
        if(response.status){
           navigate("/thanks",{state:{from:"checkout"}});
        }
      } catch (error) {
        console.log(error);
      }
     }
      
  return (
    <PayPalScriptProvider options={{clientId ,currency}}>
      <div className="flex justify-center p-4 w-full">
        <PayPalButtons className="w-full lg:w-1/2"
          style={{ layout: "vertical", shape: "rect" }}
          createOrder={(_, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description,
                  amount: {
                    value: amount,
                    currency_code: currency,
                  },
                },
              ],
            });
          }}
          onApprove={async (_, actions) => {
            if (!actions.order) return;
            await actions.order.capture();
             const details = await actions.order.capture();
            const paymentId =details.id;
            handleConfirmPayment(paymentId||"");
            cartData?.data?.cart_items?.forEach(async(item:any)=>{
              await triggerCart({do:"remove",id:item.cart_id});
              await triggerCart({do:"view"});
            })
            dispatch(setProducts([]));
            dispatch(setToLocalStorage());
          }}
          onError={(err) => {
            if (onError) {
              onError(err);
            } else {
              console.error("PayPal Checkout Error", err);
              alert("Something went wrong with PayPal payment.");
            }
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
