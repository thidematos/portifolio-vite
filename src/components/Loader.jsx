function Loader({ width = 'w-full' }) {
  return (
    <div
      className={`${width} h-full flex flex-row justify-center items-center`}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
