function Button({ loading, children, type, variant, customClass, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${
        !variant ? 'bg-slate-700' : variant === 'success' ? 'bg-emerald-950' : variant === 'form' ? 'bg-sky-500' : ''
      } p-2 uppercase hover:opacity-60 border ${customClass} `}
    >
      {children}
    </button>
  );
}

export default Button;
