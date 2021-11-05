import { useState } from "react/cjs/react.development";
import ChangeUserProfile from "../../components/ChangeUserProfile/ChangeUserProfile";
import classes from "./index.module.scss";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenChangeProfileHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={classes.section}>
      <button onClick={isOpenChangeProfileHandler}>Zmienić dane</button>
      <ChangeUserProfile isOpen={isOpen} />
    </section>
  );
};

export default Profile;
