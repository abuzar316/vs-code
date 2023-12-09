import { Route, Routes } from "react-router-dom";
import HomeScreens from "../pages/HomeScreens";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreens />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Index;
