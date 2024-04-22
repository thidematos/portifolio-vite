import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import RouterModal from './RouterModal';
import ImageUploader from './ImageUploader';
import { useEffect } from 'react';

function EditImg() {
  const [work, setWork] = useOutletContext();
  const [searchParams] = useSearchParams();

  const { id } = useParams();
  const field = searchParams.get('field');

  return (
    <div>
      <RouterModal isModalScrollable={true} path={-1}>
        <div className="w-full h-full flex flex-col justify-center items-center font-poppins gap-5">
          <h1 className=" text-2xl text-gray-700">
            {work.title?.toUpperCase()}
          </h1>
          <Content>
            <Label>Imagem atual:</Label>
            <img src={`/${work[field]}`} />
          </Content>
          <Content>
            <Label>Selecione uma nova imagem:</Label>
          </Content>
        </div>
      </RouterModal>
    </div>
  );
}

function Content({ children }) {
  return (
    <>
      <div className="w-full text-gray-500 flex flex-col justify-center items-center gap-2">
        {children}
      </div>
    </>
  );
}

function Label({ children }) {
  return <p className="text-lg">{children}</p>;
}

export default EditImg;
