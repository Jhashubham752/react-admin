const TOKEN = "token";
const USER = "user";

export const isLogin = () => {
  if (localStorage.getItem(TOKEN)) {
    return true;
  }

  return false;
};

export const getItems = () => {
  if (localStorage.getItem(USER)) {
    // return JSON.parse(USER);
    // console.log("USER", JSON.parse(localStorage.getItem(USER)));
    return JSON.parse(localStorage.getItem(USER));
  } else {
    return false;
  }
};
