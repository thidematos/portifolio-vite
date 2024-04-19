import LoginForm from './LoginForm';

function LoginAdmin() {
  return (
    <div className="w-full h-full flex flex-col justify-end items-center bg-blue-500 rounded-xl">
      <div className="w-full h-[99%] bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-2">
        <h1 className="font-roboto tracking-tighter text-gray-800 text-[2.6rem] drop-shadow-md">
          Thiago L. Matos
        </h1>
        <h2 className="font-poppins text-gray-500 text-xl drop-shadow-md">
          Admin Dashboard
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginAdmin;
