import Toast from "../components/Toast";

const ToastProvider = ({ toastType, toastMessage, clearToast }) => {
    if(!toastType) return null;

    setTimeout(()=>{
        clearToast();
    },2500)
    
    return (
      <Toast toastType={toastType} message={toastMessage}/>
  )
}

export default ToastProvider;
