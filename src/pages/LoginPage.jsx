import React from "react";
import { Card } from "@mui/material";
import LoginInput from "../components/LoginInput";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../states/authUser/action";

function LoginPage() {
  const dispatch = useDispatch();

  const loginHandler = ({ username, password }) => {
    dispatch(asyncLogin({ username, password }));
  };

  return (
    <section className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-[600px] rounded-lg p-4 shadow-md md:px-20 md:py-8">
        <h2 className="text-center text-lg font-bold capitalize md:text-xl lg:text-2xl">
          Log In to <span className="text-orange-600">your account</span>
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400 italic md:text-sm">
          Please enter your details
        </p>
        <LoginInput onLogin={loginHandler} />
      </Card>
    </section>
  );
}

export default LoginPage;
