import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedStepProps {
  from: string; // الخطوة اللي جاي منها
  redirectTo: string; // يروح فين لو الشرط مش متحقق
  children: React.ReactNode;
}

const ProtectedStep: React.FC<ProtectedStepProps> = ({ from, redirectTo, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || location.state.from !== from) {
      navigate(redirectTo, { replace: true });
    }
  }, [location, from, redirectTo, navigate]);

  return <>{children}</>;
};

export default ProtectedStep;
