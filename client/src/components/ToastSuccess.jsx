import { FaRegCheckCircle } from "react-icons/fa";

const ToastSuccess = ({message}) => {
  return (
<div className="toast toast-top toast-center w-full">
  <div className="alert alert-success bg-success rounded-none flex justify-center">
    <FaRegCheckCircle color="#F1F5F9"/>
    <span className="text-white1">{message}</span>
  </div>
</div>
  )
}

export default ToastSuccess;
