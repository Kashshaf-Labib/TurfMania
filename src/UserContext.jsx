import { createContext, useEffect, useState } from "react";
import axios from "axios";
//import { data } from "autoprefixer";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("http://localhost:3001/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
        },
      }).then(({ data }) => {
        setUser(data);
        console.log(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
