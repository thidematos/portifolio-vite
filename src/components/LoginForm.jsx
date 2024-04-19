import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import Loader from './Loader';
import Error from './Error';

function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => {
      setError('');
    }, 4000);
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { email: user, password };

    try {
      setIsLoading(true);
      const data = await axios.post(
        'http://127.0.0.1:3001/api/v1/users/login',
        credentials
      );

      console.log(data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading && (
        <form className="w-full p-8 flex flex-col justify-center items-center gap-3 relative">
          <InputDiv
            type={'text'}
            label={'Usuário'}
            labelId={'user'}
            icon={'user'}
            placeholder="Astronauta!"
            state={user}
            setter={setUser}
          />
          <InputDiv
            type={'password'}
            label={'Senha'}
            labelId={'pwd'}
            icon={'pwd'}
            placeholder="*******"
            state={password}
            setter={setPassword}
          />
          <Button onSubmit={handleSubmit} />
        </form>
      )}
      {isLoading && <Loader />}
      {error && <ErrorNotification />}
    </>
  );
}

function ErrorNotification() {
  return <div className="absolute bottom-5">Ocorreu um erro man</div>;
}

function Button({ onSubmit }) {
  return (
    <button
      className="font-poppins text-2xl px-6 py-3 text-gray-50 bg-blue-500 rounded-md shadow-lg drop-shadow-sm mt-6"
      onClick={(e) => onSubmit(e)}
    >
      LOGIN
    </button>
  );
}

function InputDiv({ type, label, labelId, icon, placeholder, state, setter }) {
  const [showPassword, setShowPassoword] = useState(false);

  return (
    <div className="flex flex-col justify-center items-start w-full gap-2">
      <label
        htmlFor={labelId}
        className="font-poppins text-gray-500 text-lg drop-shadow-sm"
      >
        {label}
      </label>
      <div className="relative w-full">
        <img
          src={`/${icon}-icon.png`}
          alt=""
          className="absolute h-[50%] top-[25%] left-2 drop-shadow-sm"
        />
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : 'text'
          }
          id={labelId}
          className="w-full min-h-[50px] pl-[15%] font-poppins text-gray-700 shadow-sm rounded"
          placeholder={placeholder}
          value={state}
          onChange={(e) => setter(e.target.value)}
        ></input>
        {type === 'password' && (
          <img
            src={`/${showPassword ? 'hidden' : 'show'}-pwd-icon.png`}
            alt=""
            className="absolute h-[40%] top-[30%] right-2 opacity-75"
            onClick={() => setShowPassoword((current) => !current)}
          />
        )}
      </div>
    </div>
  );
}

export default LoginForm;
