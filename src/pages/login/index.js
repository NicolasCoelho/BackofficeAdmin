import React from "react";
import * as S from "./styles";
import LogoDivulgadores from "../../Assets/LogoDivulgadores.png";
import LogoEcomLab from "../../Assets/LogoEcomLab.png";
import { useForm } from "react-hook-form";
import { Redirect, Router } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../../routes/auth";
import { sign } from "jsonwebtoken";

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.email === "moises" && data.password === "123") {
      const Token = sign(data.email, "ECOMTEST");
      localStorage.setItem("Token", Token);
    }
    history.push("/dashboard");
  };

  return (
    <S.Container>
      <S.Left />
      <S.Right>
        <div id="Wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <img src={LogoDivulgadores} alt="LogoDivulgadores" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              ref={register}
              required={true}
            />
            <input
              className="InputForm"
              type="password"
              placeholder="Password"
              name="password"
              ref={register}
              required={true}
            />
            <button type="submit" id="buttonSubmit">
              Entrar
            </button>
            {/* <Link to="/dashboard">
              <input type="submit" value="Entrar" id="buttonSubmit" />
            </Link> */}
          </form>
        </div>
      </S.Right>
    </S.Container>
  );
};

export default Login;
