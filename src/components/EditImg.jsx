import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import RouterModal from './RouterModal';

function EditImg() {
  const [work, setWork] = useOutletContext();
  const [searchParams] = useSearchParams();

  const { id } = useParams();
  const field = searchParams.get('field');

  return (
    <div>
      <RouterModal path={-1}>
        <h1>Eu sou a imagem :D</h1>
        <h2>É sério: {work.src}</h2>
      </RouterModal>
    </div>
  );
}

export default EditImg;
