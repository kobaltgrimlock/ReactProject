import { createContext, useState } from "react";

// create the context
export const UserContext = createContext({});

// create the provider
export function UserContextProvider({ children }) {
  console.log("inside the context");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLogged, setIsLogged] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const [criterias, setCriterias] = useState({
    month: "",
    year: "2017",
    town: "",
    flat_model: "",
    flat_type: "",
    block: "",
    street_name: "",
    storey_range: "",
    floor_area_sqm: "",
    lease_commence_date: "",
    remaining_lease: "",
    resale_price: "",
    _id: "",
    budget: "",
  });

  const handleCredentialsChange = (event) => {
    setCredentials((prevCredentials) => {
      const newCredentials = {
        ...prevCredentials,
        [event.target.name]: event.target.value,
      };
      return newCredentials;
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      setIsLogged(true);
      alert("You are connected");
    } else {
      setIsLogged(false);
      alert("Wrong credentials");
    }
    setCredentials({ username: "", password: "" });
  };

  //   const handleLogin = (event) => {
  //     event.preventDefault();
  //     alert(
  //       `Logged in with username: ${credentials.username} and password: ${credentials.password}`
  //     );
  //     setIsLogged(true);
  //   };
  const contextValue = {
    credentials,
    setCredentials,
    handleCredentialsChange,
    handleLogin,
    isLogged,
    setIsLogged,
    criterias,
    setCriterias,
    favorites,
    setFavorites,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
