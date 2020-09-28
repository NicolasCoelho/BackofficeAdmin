// the constant is a stateless function with return "true"
import { verify } from "jsonwebtoken";

export const isAuthenticated = function () {
  const getToken = localStorage.getItem("Token");
  if (!getToken) {
    return false;
    console.log("email ou senha invalidos");
  }
  const getVerifica = verify(getToken, "ECOMTEST");
  if (getVerifica) {
    return true;
  }
  return false;
};
