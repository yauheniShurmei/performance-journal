import classes from "./NavigationBar.module.scss";
import Link from "next/dist/client/link";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const NavigationBar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <section className={classes.section}>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default NavigationBar;
