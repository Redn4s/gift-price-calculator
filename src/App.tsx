import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/index";

export const App = () => {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
    </Routes>
  );
};
