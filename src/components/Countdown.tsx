import  { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown =  ({ endDate }: { endDate: any }) => {
    const{t}=useTranslation()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex flex-row-reverse justify-end gap-2">
      <div className="bg-gray-700 text-white rounded-2xl px-3 py-2 text-center">
        <p>{timeLeft.seconds}</p>
        <span>{t("seconds")}</span>
      </div>
      <div className="bg-gray-700 text-white rounded-2xl px-3 py-2 text-center">
        <p>{timeLeft.minutes}</p>
        <span>{t("minutes")}</span>
      </div>
      <div className="bg-gray-700 text-white rounded-2xl px-3 py-2 text-center">
        <p>{timeLeft.hours}</p>
        <span>{t("hours")}</span>
      </div>
      <div className="bg-gray-700 text-white rounded-2xl px-3 py-2 text-center">
        <p>{timeLeft.days}</p>
        <span>{t("days")}</span>
      </div>
    </div>
  );
};

export default Countdown