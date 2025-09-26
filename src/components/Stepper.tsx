import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Stepper = () => {
 const{t,i18n}=useTranslation();
 interface Step {
  label: string;
  path: string;
}
const steps: Step[] = [
  { label: t("cart.title"), path: "/cart" },
  { label: t("cart.confirm_order"), path: "/confirm-order" },
  { label: t("cart.checkout"), path: "/checkout" },
  { label: t("cart.thank_you"), path: "/thanks" },
];
      const { pathname } = useLocation();
  const currentStep = steps.findIndex((step) => pathname.startsWith(step.path));

  return (
     <div className="relative flex justify-between items-start w-full lg:w-[600px] xl:w-[800px] ">
      <div className=" absolute top-3 left-[calc(11%+14px)] right-[calc(11%+14px)] h-1.5 bg-gray-200 z-0"></div>

      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center flex-1 z-10"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
              index <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          />

          <p
            className={`mt-2 text-sm text-center ${
              index === currentStep
                ? "text-purple-600 font-bold"
                : "text-gray-600"
            }`}
          >
            {step.label}
          </p>

          {index < currentStep && (
            <div className={`absolute top-3 ${i18n.language==="ar"?"right-1/2":"left-1/2"}  w-full h-1.5 bg-purple-600 -z-10`}></div>
          )}
        </div>
      ))}
    </div>
   
  )
}

export default Stepper