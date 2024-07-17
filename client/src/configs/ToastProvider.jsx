import ToastSuccess from "../components/ToastSuccess";
import ToastError from "../components/ToastError";

const ToastProvider = ({ toastType, toastMessage, clearToast }) => {
    if(!toastType) return null;

    setTimeout(()=>{
        clearToast();
    },2500)
    
    return (
    <>
    {toastType === 'success' && <ToastSuccess message={toastMessage}/>}
    {toastType === 'error' && <ToastError message={toastMessage}/>}
    </>
  )
}

export default ToastProvider;
