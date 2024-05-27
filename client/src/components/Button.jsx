function Button({ loading, children, type }) {
  return (
    <button
      disabled={loading}
      className={`${
        !type ? "bg-slate-700" : type === "success" ? "bg-emerald-950" : ""
      } p-3 uppercase hover:opacity-60 border `}
    >
      {children}
    </button>
  );
}

export default Button;
