import useInput from "../../hooks/use-input";
import classes from "./login.module.scss";
import Link from "next/dist/client/link";
import { useContext } from "react";
import AuthContext from "../../components/store/auth-context";
import { useRouter } from "next/dist/client/router";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const {
    value: loginValue,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangeHandler: loginChangeHandler,
    inputBlurHandler: loginBlurHandler,
    resetAll: loginReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetAll: passwordReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (loginIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    loginBlurHandler();
    passwordBlurHandler();
    if (!formIsValid) {
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtgYKaQOmH8iVaIbJsasvieb_kgTCjZfA",

      {
        method: "POST",
        body: JSON.stringify({
          email: loginValue,
          password: passwordValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          loginReset();
          passwordReset();
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Autentification failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken);
        authCtx.getLocalId(data.localId);
        router.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.section}>
      <div className={classes.main}>
        <h1>Log-in</h1>
        <form onSubmit={submitFormHandler}>
          <label htmlFor="login">Email</label>
          <input
            value={loginValue}
            onChange={loginChangeHandler}
            onBlur={loginBlurHandler}
            id="login"
            type="text"
            placeholder="twój email id"
          />
          {loginHasError && <p>pole nie może być pustym</p>}
          <label htmlFor="password">Hasło</label>
          <input
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            id="password"
            placeholder="hasło"
          />
          {passwordHasError && <p>pole nie może być pustym</p>}
          <a href="#">Zapomniałeś hasła?</a>
          <button type="submit">Login</button>
          <span>
            Nie masz konta?{" "}
            <Link href="/signup">
              <b>Zarejestruj się</b>
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Login;
