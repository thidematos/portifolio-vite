import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';
import useCredentials from './../hooks/useCredentials';
import RouterModal from '../components/RouterModal';
import Error from '../components/Error';

function Dashboard() {
  const { isLoading, error, user } = useCredentials();

  if (error)
    return (
      <RouterModal path={'/codice-desvelado'}>
        <Error message={error} />
      </RouterModal>
    );

  return (
    <div>
      {isLoading && <Loader />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <h1>Esse é um ótimo dashboard, {user.name} 🛠️</h1>
      )}
    </div>
  );
}

export default Dashboard;
