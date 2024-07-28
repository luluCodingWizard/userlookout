import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import SearchUser from "./components/SearchUser";
import { UserProvider } from "./context/UserContext";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <div className="container">
      <Header />
      <UserProvider>
        <SearchUser />
        <UserInfo />
      </UserProvider>
    </div>
  );
}

export default App;
