import styled from "styled-components";
import BgImg from "../../Assets/bgLogin.png";

export const Container = styled.div`
  display: flex;
  background: #f8f8f8;
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
  display: flex;
  justify-content: center;

  .FatherBoxRight {
    margin-top: 21%;

    p {
      color: #8e8e8e;
      font-size: 31px;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 15px;
    }

    #ChildrenBoxInputRight {
      display: flex;
      flex-direction: column;

      input {
        margin-top: 30px;
        height: 83px;
        border-radius: 4px;
        border: solid 2px #c2c2c2;
        padding: 0 0 0 30px;
        font-size: 27px;
      }

      input:focus {
        outline: 2px solid #2aff71; /* oranges! yey */
        border-radius: 4px;
      }

      input::placeholder {
        font-size: 27px;
        font-weight: 500;
        color: #d0d0d0;
      }

      button {
        color: white;
        background: #00ab39;
        height: 66px;
        border: none;
        margin-top: 45px;
        border-radius: 4px;
      }
    }
  }
`;
