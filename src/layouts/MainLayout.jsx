import { Outlet } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

const MainLayout = () => {  
  return (
    <AnimatePresence>
      <Outlet />
    </AnimatePresence>
  );
};

export default MainLayout;
