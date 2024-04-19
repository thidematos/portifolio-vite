import { useState } from 'react';

function Error({ message }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-14 items-center py-10 px-6 font-poppins">
      <p className="text-2xl text-gray-800">Ocorreu um erro...</p>
      <img src="error.png" alt="" className="w-[60%]"></img>
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-gray-800 text-lg">Descrição do problema:</p>
        <p className="text-base text-gray-600 w-full">{message}</p>
      </div>

      <div className="font-poppins text-sm w-full flex flex-col justify-center items-center">
        <p className="">Caso precise de ajuda, entre em contato: </p>
        <a
          className={`${isHovered ? 'text-blue-500' : 'text-gray-500'}`}
          href="mailto:raizer50@gmail.com"
          onMouseEnter={() => setIsHovered((state) => !state)}
          onMouseOut={() => setIsHovered((state) => !state)}
        >
          raizer50@gmail.com
        </a>
      </div>
    </div>
  );
}

export default Error;
