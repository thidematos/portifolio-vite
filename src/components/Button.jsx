function Button({
  type = 'action',
  onAction,
  children,
  margin,
  fontSize,
  path = -1,
  bgColor = 'bg-blue-500',
  textColor = 'text-gray-50',
  padding = 'px-6 py-3',
}) {
  //type === 'action' || 'back'

  function handleAction(e) {
    if (type === 'action') return onAction(e);

    if (type === 'back') return onAction(path);
  }

  return (
    <button
      className={`font-poppins ${fontSize} ${padding} ${textColor} ${bgColor} rounded-md shadow-lg drop-shadow-sm ${margin}`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
}

export default Button;
