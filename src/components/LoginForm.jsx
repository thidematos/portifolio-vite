import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import Loader from './Loader';
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function LoginForm({ pathToAfterLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError('');
    }, 4000);
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { email: user, password };

    try {
      setIsLoading(true);
      const data = await axios.post(
        'http://127.0.0.1:3000/api/v1/users/login',
        credentials,
        {
          withCredentials: true,
        }
      );

      if (!data.statusText === 'OK') {
        throw new Error('Falha em autenticar o usuário.');
      }

      navigate(pathToAfterLogin);
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
          <Button onSubmit={handleSubmit} margin={'mt-6'} fontSize={'text-2xl'}>
            LOGIN
          </Button>
        </form>
      )}
      {isLoading && <Loader width="w-[80%]" />}
      {error && <ErrorNotification />}
    </>
  );
}

function ErrorNotification() {
  return <div className="absolute bottom-5">Ocorreu um erro man</div>;
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
