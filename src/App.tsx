import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./features/header/Header";
import SpellsList from "./features/spells/SpellsList";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <SpellsList />
    </div>
  );
}

export default App;
