function Button({ loading, children, type, variant, customClass, onClick }) {
  const getClassVariant = (variant) => {
    switch (variant) {
      case 'primary':
        return 'text-white px-3 py-2 bg-indigo0 hover:bg-indigo1';
      case 'secondary':
        return 'text-gray2 px-3 py-2 bg-gray-0 hover:bg-gray1';
      default:
        return 'text-white px-3 py-2 bg-[#059669] hover:bg-[#A7F3D0]';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`rounded-xl font-semibold text-base ${getClassVariant(variant)} ${customClass} `}
    >
      {loading && (
        <div className="flex items-center gap-0.5">
          <svg
            class="animate-spin size-4 mr-2 border-white1 border-t-gray1 border-2 rounded-full"
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
