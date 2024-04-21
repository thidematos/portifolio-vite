import { useOutletContext, useSearchParams } from 'react-router-dom';
import RouterModal from './RouterModal';
import ProjecLogo from './ProjectLogo';

function EditWork() {
  const work = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const field = searchParams.get('field');

  return (
    <RouterModal path={-1}>
      <div className="w-full h-full bg-gray-200 rounded-xl">
        <ProjecLogo work={work} padding={'pt-6'} width={'w-[60%]'} />
        <EditField work={work} field={field} />
      </div>
    </RouterModal>
  );
}

function EditField({ work, field }) {
  return (
    <form>
      <h2>{field}</h2>
      <input type="text" placeholder={work[field]} />
      <button className="bg-blue-500 text-gray-200 p-6">
        Butaum to ASynC PATCH
      </button>
    </form>
  );
}

export default EditWork;
