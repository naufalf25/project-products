import React from "react";
import Input from "./Input";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import Button from "./Button";

function LoginInput({ onLogin }) {
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-4"
      autoComplete="off"
    >
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Username</label>
        <Input
          type="text"
          placeholder="Your Username"
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Password</label>
        <Input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <Button
        type="submit"
        className="mt-4 rounded-lg border border-orange-600 bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-transparent hover:text-orange-600"
      >
        Login
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
