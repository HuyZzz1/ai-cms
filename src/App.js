/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 3 PRO React - v2.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "examples/Sidenav";

import theme from "assets/theme";

import themeDark from "assets/theme-dark";

import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

import routes from "routes";

import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { Toast } from "components/Toast";
import { meQuery } from "service/api/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userRecoil } from "service/recoil/user";
import LoaderComponent from "components/LoaderComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import SignIn from "layouts/authentication/sign-in";
import { DEFAULT_FILTER, QueryKey, RoleName } from "./service/constant";
import { regionsRecoil } from "./service/recoil/regions";
import { getListRegionsQuery } from "./service/api/camera";

const injectUserNameToRoutes = (routes, userRole) =>
  routes.map((route) => {
    const newRoute = { ...route };

    if (newRoute.dynamicName) {
      newRoute.name = RoleName[userRole] || userRole;
    }

    if (Array.isArray(newRoute.collapse)) {
      newRoute.collapse = injectUserNameToRoutes(newRoute.collapse, userRole);
    }

    return newRoute;
  });

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userRecoil);
  const setRegions = useSetRecoilState(regionsRecoil);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse); // trả ra mảng các <Route />
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return [];
    });

  const routesWithUserName = useMemo(() => {
    if (!user?.role) return routes;
    return injectUserNameToRoutes(routes, user.role);
  }, [user]);

  const { mutate: fetchMe, isPending } = useMutation({
    mutationFn: meQuery,
    onSuccess: ({ data }) => {
      setUser({ ...data, isLoading: false });

      if (pathname === "/authentication/sign-in") {
        navigate("/dashboards/overview");
      }
    },
    onError: (error) => {
      console.error("❌ onError", error);
      navigate("/authentication/sign-in");
    },
  });

  const { data: dataRegions } = useQuery({
    enabled: !!user._id,
    queryKey: [QueryKey.configField],
    queryFn: () => getListRegionsQuery({ ...DEFAULT_FILTER, limit: 9999 }),
  });

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    if (dataRegions?.data?.docs?.length > 0) {
      setRegions(dataRegions?.data?.docs);
    }
  }, [dataRegions]);

  useEffect(() => {
    fetchMe();
  }, []);

  if (isPending) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Toast />
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            routes={routesWithUserName}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes(routesWithUserName)}
        <Route path="/authentication/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    </ThemeProvider>
  );
}
