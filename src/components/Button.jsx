function Button({ type = 'action', onAction, children, margin, fontSize }) {
  //type === 'action' || 'back'

  function handleAction(e) {
    if (type === 'action') return onAction(e);

    if (type === 'back') return onAction(-1);
  }

  return (
    <button
      className={`font-poppins ${fontSize} px-6 py-3 text-gray-50 bg-blue-500 rounded-md shadow-lg drop-shadow-sm ${margin}`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
}

export default Button;
