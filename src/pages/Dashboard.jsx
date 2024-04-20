import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';
import useCredentials from './../hooks/useCredentials';
import RouterModal from '../components/RouterModal';
import Error from '../components/Error';
import Logo from '../components/Logo';
import HambMenu from '../components/HambMenu';
import Footer from '../components/Footer';
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  const { isLoading, error, user } = useCredentials();

  if (error)
    return (
      <RouterModal path={'/codice-desvelado'}>
        <Error message={error} />
      </RouterModal>
    );

  return (
    <>
      {isLoading && <Loader position={'absolute centerDivAbsolute'} />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        //Pode ser que eu faça um swiper com os PreviewDashboard. Depois, viria um gráfico com n. de users, likes, best post...
        <DashMainContainer>
          <NavDashboard user={user} />
          <div className="mt-28"></div>
          <PreviewDashboard title={'Projetos'} img={'mern-2.1'} />
          <PreviewDashboard title={'Pedidos'} img={'mern-3.1'} />
          <PreviewDashboard title={'Códice'} img={'mern-4.1'} />
          <PreviewDashboard title={'Reviews'} img={'mern-5.1'} />
          <Graph />
          <Footer
            bgColor={'bg-transparent'}
            padding={''}
            fontSize={
              'text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base'
            }
            textColor={'text-gray-500'}
          />
        </DashMainContainer>
      )}
    </>
  );
}

function DashMainContainer({ children }) {
  return (
    <div className="w-full bg-gray-50 px-5 pb-8 min-h-svh flex flex-col justify-start items-center relative gap-10">
      {children}
    </div>
  );
}

function NavDashboard({ user }) {
  const links = [
    { to: 'works', title: 'Projetos' },
    { to: 'works', title: 'Projetos' },
    { to: 'works', title: 'Projetos' },
    { to: 'works', title: 'Projetos' },
  ];

  return (
    <div className="w-full px-5 py-4 z-[999] bg-gray-50/75 flex flex-row justify-between items-center fixed ">
      <Logo fontSize={'text-4xl'} />
      <img
        src={`${user.photo}`}
        className="rounded-full w-[25%] bg-inherit border-2 border-blue-500"
      ></img>
    </div>
  );
}

function PreviewDashboard({ title, img }) {
  return (
    <Link to={'works'}>
      <div className="w-full rounded-lg shadow-lg relative">
        <div className={`w-full rounded-lg`}>
          <img
            src={`/${img}.png`}
            className="w-full rounded-lg opacity-55 brightness-75"
          ></img>
        </div>
        <h1 className="w-[60%] text-center font-poppins text-blue-500 text-3xl drop-shadow-xl bg-gray-200 px-6 py-4 rounded-lg shadow-lg absolute centerDivAbsolute tracking-wider">
          {title}
        </h1>
      </div>
    </Link>
  );
}

function Graph() {
  return <h1>This is a graph =]</h1>;
}

export default Dashboard;
