import NavigationBar from '@/components/organisms/NavigationBar';
import ScrollToTop from '@/helpers/ScrollToTop';
import { Outlet } from 'react-router-dom';
import Header from "@/components/organisms/Header.tsx";


const MainLayout: React.FC = () => {
  return (
      <>
          <Header />
          <ScrollToTop/>
          <div className="tw-mx-32 tw-p-6">
              <div className="md:tw-col-span-10 ">
                  <Outlet/>
              </div>
          </div>
          <NavigationBar/>
      </>
  );
};

export default MainLayout;
