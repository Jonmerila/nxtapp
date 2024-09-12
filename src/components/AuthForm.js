"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("anka@ankademin.se");
  const [password, setPassword] = useState("admincool");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    console.log("INPUTS", email, password, name);

    if (email === "") {
      setError("A email is required.");
      return;
    }
    if (password === "") {
      setError("A password is required.");
      return;
    }
    if (!isLogin && name === "") {
      setError("A name is required.");
      return;
    }

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }

    if (response.ok) {
      console.log("data", data);
      localStorage.setItem("@library/token", data.token);
      auth.setToken(data.token);
      router.push("/plants");
      return;
    }

    setError("Invalid login credentials");
  }

  console.log("Auth", auth);

  return (
    <div className="h-92 w-96 mx-auto">
      <form
        className="flex flex-col items-center gap-6 p-6 text-black text-lg form bg-white h-full w-full rounded"
        onSubmit={handleSubmit}
      >
        <div className="form__group flex flex-col gap-6">
          <label className="form__label font-bold">Email</label>
          <input
            className="form__input border-[1px] border-black p-1 rounded-sm"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group flex flex-col gap-6">
          <label className="form__label font-bold">Password</label>
          <input
            className="form__input border-[1px] border-black p-1 rounded-sm"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div className="form__group flex flex-col gap-6">
            <label className="form__label font-bold">Name</label>
            <input
              className="form__input border-[1px] border-black p-1 rounded-sm"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button className="form__button form__button--primary  bg-green-200 p-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="form__text text-sm">Not a user?</p>
        <div className="form__group">
          <button
            className="form__button form__button--secondary bg-green-200 p-2 rounded"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
