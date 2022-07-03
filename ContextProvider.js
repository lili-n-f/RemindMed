import { createContext } from "react";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext(null);

const ContextProvider = (props) => {
  //user te devuelve el usuario, null si no hay
  //loading te devuelve si te está cargando o no
  //error es si ocurre un error
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
