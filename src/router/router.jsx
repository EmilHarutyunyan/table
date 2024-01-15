import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "../layout/Layout";
import { HOME } from "./path";
// Pages
import {
  Home,
} from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={HOME} element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  )
);

export default router;
