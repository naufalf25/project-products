import { useEffect } from "react";
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

function App() {
  const {
    authUser = null,
    loading = false,
    isPreload = false,
  } = useSelector((states) => states);

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
      <div className="font-roboto flex gap-4 bg-orange-50">
        <LoadingBar />
        <header>
          <Navigation onSignOut={handleSignOut} authUser={authUser} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="font-roboto bg-orange-50">
      <LoadingBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
