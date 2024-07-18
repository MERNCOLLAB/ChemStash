import { FaRegCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { IoWarningOutline } from "react-icons/io5";

const Toast = ({ toastType, message }) => {
  const toastConfig = {
    success: {
      style: 'alert-success bg-success border-success',
      icon: <FaRegCheckCircle color="#F1F5F9" />
    },
    error: {
      style: 'alert-error bg-danger border-danger',
      icon: <VscError color="#F1F5F9" />
    },
    warning: {
      style: 'alert alert-warning bg-[#E2D740] border-[#E2D740]',
      icon: <IoWarningOutline color="#F1F5F9" />
    },
    default: {
      style: 'alert-info border-none',
      icon: null
    }
  };

  const { style, icon } = toastConfig[toastType] || toastConfig.default;

  return (
    <div className="toast toast-top toast-center w-full">
      <div className={`alert flex justify-center rounded-none ${style}`}>
        {icon}
        <span className="text-white1">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
