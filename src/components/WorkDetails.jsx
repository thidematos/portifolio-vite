import { Outlet, useParams } from 'react-router-dom';
import Loader from './Loader';
import Error from './Error';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function WorkDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [work, setWork] = useState({});

  useEffect(() => {
    const getWork = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://127.0.0.1:3000/api/v1/works/${id}`);

        setWork(res.data.data.work);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getWork();
  }, [id]);

  return (
    <div className="w-full">
      {isLoading && <Loader />}
      {error && <Error message={error} />}
      {!isLoading && !error && (
        <>
          <Outlet context={work} />
          <Container>
            <Details />
            <EditArea>
              <Title
                title={work.title}
                fontColor={'text-gray-700'}
                fontSize={'text-2xl'}
                toUpperCase={true}
                margin={'my-4'}
                content={'title'}
              />
              <Title
                title={work.subTitle}
                fontColor={'text-gray-700'}
                fontSize={'text-sm'}
                toUpperCase={true}
                margin={'my-4'}
                content={'subTitle'}
              />
            </EditArea>
          </Container>
        </>
      )}
    </div>
  );
}

function Container({ children }) {
  return (
    <div className="w-full py-6 flex flex-col justify-start items-center ">
      {children}
    </div>
  );
}

function EditArea({ children }) {
  return (
    <div className="bg-gray-200 w-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

function Details() {
  return (
    <h5 className="w-full font-poppins text-center text-gray-400 pb-6">
      Clique em alguma das opções para editar
    </h5>
  );
}

function Title({
  title,
  fontSize,
  fontColor,
  padding,
  margin,
  width,
  toUpperCase = false,
  content,
}) {
  return (
    <Link to={`editar?field=${content}`}>
      <h2
        className={`font-poppins ${fontColor} ${fontSize} ${padding} ${margin} ${width} drop-shadow text-center hover:text-blue-500 hover:underline underline-offset-2 `}
      >
        {toUpperCase ? title?.toUpperCase() : title}
      </h2>
    </Link>
  );
}

export default WorkDetails;
