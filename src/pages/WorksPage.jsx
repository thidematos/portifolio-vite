import useCredentials from '../hooks/useCredentials';

function WorksPage() {
  const { isLoading, error, user } = useCredentials();

  return (
    <div>
      <h1>I Have all the works. Muahahhahaha {user.name}</h1>
    </div>
  );
}

export default WorksPage;
