import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
