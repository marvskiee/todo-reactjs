import { useEffect, useState } from "react";
import Login from "../pages/Login";
import ToDo from "../pages/ToDo";
import Register from "../pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuth, login, register } from "../services/user.services";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState("login");
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const toasterConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
  };
  const checkUserHandler = async () => {
    try {
      const local_user = localStorage?.getItem("user");

      if (local_user) {
        const res = await checkAuth(local_user);
        if (res?.success) {
          setIsLoggedIn(true);
          setLoginCredentials(res?.data);
        }
      }
    } catch (e) {
      console.log(e);
      setForm("login");
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checkUserHandler();
  }, []);
  const loginHandler = async (e) => {
    e.preventDefault();
    const { username, password } = loginCredentials;
    console.log(loginCredentials);
    if (username?.trim().length > 0 && password?.trim().length > 0) {
      try {
        const res = await login(loginCredentials);
        if (res?.success) {
          localStorage?.setItem("user", res?.data?._id);
          setIsLoggedIn(true);
          toast(`Welcome ${loginCredentials?.username}`, {
            ...toasterConfig,
            type: "danger",
          });
        } else {
          toast("Wrong credentials!", {
            ...toasterConfig,
            type: "error",
          });
        }
      } catch (e) {
        toast("Something went wrong!", {
          ...toasterConfig,
          type: "danger",
        });
        console.log(e);
      }
    }
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    const { username, password } = loginCredentials;
    console.log(loginCredentials);
    if (username?.trim()?.length > 0 && password?.trim()?.length > 0) {
      const res = await register(loginCredentials);
      if (res?.success) {
        localStorage?.setItem("user", res?.data?._id);
        setIsLoggedIn(true);
        toast(`Welcome ${loginCredentials?.username}`, {
          ...toasterConfig,
          type: "danger",
        });
      } else {
        if (res?.message?.code == 11000) {
          toast("Username already exist!", {
            ...toasterConfig,
            type: "error",
          });
        }
      }
    }
  };
  return (
    <>
      {!isLoggedIn ? (
        <>
          {form == "login" ? (
            <Login
              {...{
                toasterConfig,
                loginCredentials,
                setLoginCredentials,
                loginHandler,
                setForm,
              }}
            />
          ) : (
            <Register
              {...{
                toasterConfig,
                loginCredentials,
                setLoginCredentials,
                registerHandler,
                setForm,
              }}
            />
          )}
        </>
      ) : (
        <ToDo
          {...{
            setForm,
            toasterConfig,
            setLoginCredentials,
            loginCredentials,
            setIsLoggedIn,
          }}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
