import React, { useContext } from "react";
import { ButtonBig } from "../componentsBarrel";
import { UserContext } from "../../context/UserContext";

const PadUserProfile = (props) => {
  const user = useContext(UserContext).user;
console.log("check user in pad User Profile", user);
  const handleAddNewProduct = () => {};
  const handleUpdateUser = () => {};
  const upgradeUser = () =>{}
  const downgradeUser = () =>{}
  return (
    <div>
      {user.role === "premium" || user.role === "admin" ? (
        <ButtonBig click={handleAddNewProduct}>
          Agregar nuevo producto
        </ButtonBig>
      ) : null}
      <ButtonBig click={handleUpdateUser}>Cambiar datos personales</ButtonBig> 
      { user.role === "user"  ? <ButtonBig click={upgradeUser}>Cambiar cuenta a Premium</ButtonBig> : null
      }
      {user.role === "premium" ? <ButtonBig click={downgradeUser}>Cambiar la cuenta a Costumer</ButtonBig> : null}
    </div>
  );
};

export default PadUserProfile;
