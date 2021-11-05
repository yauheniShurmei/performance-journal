import { useRef } from "react";
import classes from "./Input.module.scss";

const Input = () => {
  const enteredValue = useRef();

  // const

  return <input ref={enteredValue} />;
};

export default Input;
