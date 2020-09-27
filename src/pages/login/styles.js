import styled from "styled-components";
import BgImg from "../../Assets/bgLogin.png";

export const Container = styled.div`
  display: flex;
  background: #f8f8f8;

  /* Notebooks */
  @media only screen and (max-width: 1440px) {
    display: flex;
    justify-content: center;
  }
`;

export const Left = styled.div`
  /* INITIAL CONFIG 1920X1080 BASED */
  width: 100vw;
  background: url("${BgImg}");
  background-repeat: no-repeat;

  @media only screen and (max-width: 2560px) {
    width: 60vw;
    background: url("${BgImg}");
    background-repeat: no-repeat;
  }

  /* Desktops */
  @media only screen and (min-width: 1920px) {
    width: 66vw;
    background: url("${BgImg}");
    background-repeat: no-repeat;
  }

  /* Notebooks */
  @media only screen and (max-width: 1800px) {
    display: none;
  }
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
        transition: 0.3s;
        color: grey;
      }

      input:focus {
        outline: 2px solid #2aff71;
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
        transition: 0.4s;
        font-size: 27px;
        font-weight: bold;

        &:focus {
          outline: none;
          background: #007828;
        }
      }
    }

    .BoxCenterEcomLogo {
      display: flex;
      justify-content: center;

      img {
        margin-top: 50%;
        height: auto;
        width: 58%;
      }
    }

    /* Ultrawides */
    @media only screen and (min-width: 2550px) {
    }

    /* Desktops */
    @media only screen and (min-width: 1920px) {
    }

    /* Notebooks */
    @media only screen and (max-width: 1440px) {
      .BoxCenterEcomLogo {
        display: flex;
        justify-content: center;

        img {
          margin-top: 20%;
          height: auto;
          width: 58%;
        }
      }
    }

    /* Ipads */
    @media only screen and (min-width: 1024px) {
    }
    /* Disp Mobiles */
    @media only screen and (min-width: 768px) {
    }
  }
`;
