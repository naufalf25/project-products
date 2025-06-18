import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { Navigate, Route, Routes } from "react-router";
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
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  const {
    authUser = null,
    loading = false,
    isPreload = false,
  } = useSelector((states) => states);

  const [nav, setNav] = useState(
    JSON.parse(localStorage.getItem("nav")) || false
  );

  const navigationContext = {
    nav,
    toggleNav: () => {
      setNav((prevState) => {
        const navCond = prevState === false ? true : false;

        localStorage.setItem("nav", JSON.stringify(navCond));

        return navCond;
      });
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(unsetAuthUser());
  };

  if (isPreload && loading) {
    return null;
  }

  if (authUser) {
    return (
      <div className="font-roboto flex min-h-screen w-full bg-orange-50">
        <LoadingBar />
        <NavProvider value={navigationContext}>
          <Navigation onSignOut={handleSignOut} authUser={authUser} />
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
        </NavProvider>
      </div>
    );
  }

  return (
    <div className="font-roboto bg-orange-50">
      <LoadingBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
