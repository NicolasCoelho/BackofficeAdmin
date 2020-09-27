import React from "react";
import * as S from "./styles";
import LogoDivulgadores from "../../Assets/LogoDivulgadores.png";
import LogoEcomLab from "../../Assets/LogoEcomLab.png";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            <input type="submit" value="Entrar" id="buttonSubmit" />
          </form>
        </div>
      </S.Right>
    </S.Container>
  );
};

export default Login;
