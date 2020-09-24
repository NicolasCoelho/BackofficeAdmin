import React from "react";
import * as S from "./styles";
import LogoDivulgadores from "../../Assets/LogoDivulgadores.png";
import LogoEcomLab from "../../Assets/LogoEcomLab.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <S.Container>
      <S.Left />
      <S.Right>
        <div className="FatherBoxRight">
          <img src={LogoDivulgadores} alt="Divulgadores Logo" />
          <p>Informe seus dados de acesso</p>
          <div id="ChildrenBoxInputRight">
            <input type="text" placeholder="login do usuário" />
            <input type="password" placeholder="senha do usuário" />
            <button type="submit">ENTRAR</button>
          </div>
          <div className="BoxCenterEcomLogo">
            <img src={LogoEcomLab} alt="Logo EcomLab" id="LogoEcomLab" />
          </div>
        </div>
      </S.Right>
    </S.Container>
  );
};

export default Login;
