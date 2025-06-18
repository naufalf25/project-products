import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { unsetAuthUser } from "./states/authUser/action";
import Navigation from "./components/Navigation";
import LoadingBar from "./components/LoadingBar";
import { NavProvider } from "./context/NavContext";
import { UIThemeProvider } from "./context/UIThemeContext";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./utils/theme";
import { CssBaseline } from "@mui/material";
import Loading from "./components/Loading";

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );

  const [nav, setNav] = useState(
    JSON.parse(localStorage.getItem("nav")) || false
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const navigationContext = useMemo(() => {
    return {
      nav,
      toggleNav: () => {
        setNav((prevState) => {
          const navCond = prevState === false ? true : false;

          localStorage.setItem("nav", JSON.stringify(navCond));

          return navCond;
        });
      },
    };
  }, [nav]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeContext = useMemo(() => {
    return {
      theme,
      toggleTheme: () => {
        setTheme((prevState) => {
          const themeCond = prevState === "light" ? "dark" : "light";

          localStorage.setItem("theme", themeCond);

          return themeCond;
        });
      },
    };
  }, [theme]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(unsetAuthUser());
  };

  if (isPreload) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (authUser) {
    return (
      <div className="font-roboto flex min-h-screen w-full bg-orange-50 dark:bg-slate-700 dark:text-white">
        <LoadingBar />
        <UIThemeProvider value={themeContext}>
          <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <CssBaseline />
            <NavProvider value={navigationContext}>
              <Navigation onSignOut={handleSignOut} authUser={authUser} />
            </NavProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path="/products/update/:id" element={<UpdateProduct />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route
                path="/*"
                element={
                  <div className="flex h-screen w-full items-center justify-center">
                    <NotFoundPage />
                  </div>
                }
              />
            </Routes>
          </ThemeProvider>
        </UIThemeProvider>
      </div>
    );
  }

  return (
    <div className="font-roboto bg-orange-50 dark:bg-slate-700 dark:text-white">
      <LoadingBar />
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <div className="flex h-screen w-full items-center justify-center">
                <NotFoundPage />
              </div>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
