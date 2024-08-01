function Button({ loading, children, type, variant, onClick, isFull }) {
  const getClassVariant = (variant) => {
    switch (variant) {
      case 'primary':
        return 'text-white px-3 py-2 bg-indigo0 hover:bg-indigo1';
      case 'secondary':
        return 'text-gray2 px-3 py-2 hover:bg-slate-100 border  border-gray1 bg-transparent';
      default:
        return 'text-white px-3 py-2 bg-[#059669] hover:bg-[#A7F3D0]';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`rounded-xl font-semibold text-base ${getClassVariant(variant)} ${isFull ? 'w-full' : 'w-fit'}`}
    >
      {loading && (
        <div className="flex items-center gap-0.5">
          <svg
            className="animate-spin size-4 mr-2 border-white1 border-t-gray1 border-2 rounded-full"
            viewBox="0 0 24 24"
          />
          <span className="font-semibold text-base">Loading</span>
        </div>
      )}
      {!loading && children}
    </button>
  );
}

export default Button;
