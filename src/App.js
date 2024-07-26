import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import SearchUser from "./components/SearchUser";

function App() {
  return (
    <div className="container">
      <Header />
      <SearchUser />
    </div>
  );
}

export default App;
