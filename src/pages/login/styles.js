import styled from "styled-components";
import BgImg from "../../Assets/bgLogin.png";

export const Container = styled.div`
  display: flex;
  background: #f8f8f8;

  /* Disp Tablets 1024 */
  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

export const Left = styled.div`
  height: 100vh;
  width: 63vw;
  background: url(${BgImg});
  background-size: contain;
  background-repeat: no-repeat;

  /* Disp Tablets 1024 */
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

export const Right = styled.div`
  height: 100vh;
  background: #f8f8f8;

  display: flex;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    width: 305px;
    margin-top: 100px;

    img {
      height: auto;
      width: 100%;
    }

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

    #buttonSubmit {
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

  /* Disp 4K */
  @media only screen and (max-width: 2560px) {
    form {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-top: 200px;

      img {
        height: auto;
        width: 100%;
      }

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
    }
  }

  /* Disp Desktop 1920px */
  @media only screen and (max-width: 1920px) {
    width: 69vw;
    form {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-top: 200px;

      img {
        height: auto;
        width: 100%;
      }

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
    }
  }

  /* Disp Notebooks */
  @media only screen and (max-width: 1440px) {
    width: 37vw;
    form {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-top: 175px;

      img {
        height: auto;
        width: 100%;
      }

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
    }
  }

  /* Disp Desktop 1920px */
  @media only screen and (max-width: 1680px) {
    width: 37vw;
    form {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-top: 200px;

      img {
        height: auto;
        width: 100%;
      }

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
    }
  }

  /* Disp Notebook 1280px */
  @media only screen and (max-width: 1280px) {
    width: 35vw;
    form {
      display: flex;
      flex-direction: column;
      width: 313px;
      margin-top: 140px;

      img {
        height: auto;
        width: 100%;
      }

      input {
        margin-top: 30px;
        height: 55px;
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
    }
  }

  /* Disp Tablets 1024 */
  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }

  /* Disp CELULARES */
  @media only screen and (max-width: 375px) {
    width: 35vw;
    form {
      display: flex;
      flex-direction: column;
      width: 251px;
      margin-top: 140px;

      img {
        height: auto;
        width: 100%;
      }

      input {
        margin-top: 30px;
        height: 55px;
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
    }
  }
`;
