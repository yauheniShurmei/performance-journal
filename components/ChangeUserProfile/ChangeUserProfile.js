import { useContext, useRef } from "react/cjs/react.development";
import AuthContext from "../store/auth-context";
import classes from "./ChangeUserProfile.module.scss";

const ChangeUserProfile = (props) => {
  const newPasswordInput = useRef();
  const authCtx = useContext(AuthContext);

  const changeProfileDataHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordInput.current.value;
    console.log(newPassword);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCtgYKaQOmH8iVaIbJsasvieb_kgTCjZfA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  let dynamicClasses = [
    classes.main,
    props.isOpen ? classes.open : classes.close,
  ];
  return (
    <section className={dynamicClasses.join(" ")}>
      <form className={classes.form} onSubmit={changeProfileDataHandler}>
        <label>Imie</label>
        <input />
        <label>Nazwisko</label>
        <input />
        <label>Telefon</label>
        <input />
        <label>Nowe hasło</label>
        <input ref={newPasswordInput} minLength="6" required />
        <button type="submit">Zachowaj</button>
      </form>
    </section>
  );
};

export default ChangeUserProfile;
