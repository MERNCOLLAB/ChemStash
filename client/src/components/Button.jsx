function Button({ loading, children, type, customClass, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`${
        !type ? 'bg-slate-700' : type === 'success' ? 'bg-emerald-950' : type === 'form' ? 'bg-sky-500' : ''
      } p-2 uppercase hover:opacity-60 border ${customClass} `}
    >
      {children}
    </button>
  );
}

export default Button;
