import styled from "styled-components";
import BgImg from "../../Assets/bgLogin.png";

export const Container = styled.div`
  display: flex;
`;

export const Left = styled.div`
  /* INITIAL CONFIG 1920X1080 BASED */
  width: 1206px;
  background: url("${BgImg}");
  height: 100vh;
`;

export const Right = styled.div`
  /* INITIAL CONFIG 1920X1080 BASED */
  width: 720px;
  background: #f8f8f8;
  height: 100vh;
`;
