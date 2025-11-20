import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/index";
import { ConfigurationsPage } from "@/pages/configurations";

export const App = () => {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ConfigurationsPage />} path="/configurations" />
    </Routes>
  );
};
