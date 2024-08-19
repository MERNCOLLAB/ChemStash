function Button({ loading, children, type, variant, onClick, isFull }) {
  const getClassVariant = (variant) => {
    switch (variant) {
      case 'primary':
        return 'rounded-xl text-white px-3 py-2 bg-blue1 hover:bg-blue0';
      case 'secondary':
        return 'rounded-xl text-gray2 px-3 py-2 hover:bg-slate-100 border  border-gray1 bg-transparent';
      case 'grayscale':
        return 'rounded-lg text-gray2 py-2 w-[254px] bg-gray0 border-gray0 border hover:border-gray2 hover:bg-transparent'
      case 'danger':
        return 'rounded-lg text-white0 bg-[#DF5858] hover:bg-[#DF5858]/80  px-3 py-2'
      default:
        return 'rounded-lg text-white px-3 py-2 bg-[#059669] hover:bg-[#A7F3D0]';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`font-semibold text-base ${getClassVariant(variant)} ${isFull ? 'w-full' : 'w-fit'}`}
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
