import { VscError } from "react-icons/vsc";
const ToastError = ({message}) => {
  return (
<div className="toast toast-top toast-center w-full">
  <div className="alert alert-error  bg-danger rounded-none flex justify-center">
    <VscError color="#F1F5F9"/>
    <span className="text-white1">{message}</span>
  </div>
</div>
  )
}

export default ToastError;
