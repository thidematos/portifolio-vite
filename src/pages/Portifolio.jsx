import { NavBar } from './../components/NavBar';
import Hero from './../components/Hero';
import { Works } from './../components/Works';
import Reports from './../components/Reports';
import Benefits from './../components/Benefits';
import WorkFlow from './../components/WorkFlow';
import AskedQuestions from './../components/AskedQuestions';
import Ending from './../components/Ending';

function Portifolio({ isMobile }) {
  return (
    <>
      <div className="overflow-x-hidden w-screen flex flex-col justify-start items-center min-h-screen bg-slate-50 pb-16 relative">
        <WelcomePage>
          <NavBar isMobile={isMobile}></NavBar>
          <Hero isMobile={isMobile}></Hero>
        </WelcomePage>
        <Works />
        <Reports />
        <Benefits isMobile={isMobile} />
        <WorkFlow isMobile={isMobile} />
        <AskedQuestions />
        <Ending />
      </div>
      <Footer />
    </>
  );
}

function WelcomePage({ children }) {
  return (
    <div className="w-screen flex flex-col md:justify-start lg:justify-evenly  items-center h-screen md:h-auto lg:h-screen">
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 w-screen flex flex-row justify-center py-6">
      <h4 className="text-sm md:text-base lg:text-xs xl:text-sm 3xl:text-base font-poppins text-gray-500">
        ©️ 2024 Thiago L. Matos. All rights reserved.
      </h4>
    </footer>
  );
}

export default Portifolio;
