function Button({ loading, children, type, variant, customClass, onClick }) {
  const getClassVariant = (variant) => {
    switch (variant) {
      case 'primary':
        return 'px-3 py-2 bg-indigo0 hover:bg-indigo1';
      case 'secondary':
        return 'px-3 py-2 bg-gray-0 hover:bg-gray2';
      default:
        return 'px-3 py-2 bg-[#FDF0BC]';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`rounded-xl text-white font-semibold text-base ${getClassVariant(variant)} ${customClass} `}
    >
      {children}
    </button>
  );
}

export default Button;
