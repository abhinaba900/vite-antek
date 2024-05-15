import { createContext, useState } from "react";
import AllRoutes from "./AllRoutes/AllRoutes";
import "./App.css";
export const Authcontext = createContext();
function AuthcontextProvider({ children }) {
  const [cartPageData, setCartPageData] = useState([]);
  const [user, setUser] = useState(false);
  console.log("Facebook login", user);

  return (
    <Authcontext.Provider
      value={{ cartPageData, setCartPageData, user, setUser }}
    >
      {children}
    </Authcontext.Provider>
  );
}

function App() {
  return (
    <div className="App">
      <AuthcontextProvider>
        <AllRoutes />
      </AuthcontextProvider>
    </div>
  );
}

export default App;
