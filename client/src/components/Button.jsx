function Button({ loading, children, type, customClass, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${
        !type ? 'bg-slate-700' : type === 'success' ? 'bg-emerald-950' : ''
      } p-3 uppercase hover:opacity-60 border ${customClass} `}
    >
      {children}
    </button>
  );
}

export default Button;
