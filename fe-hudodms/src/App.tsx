import "./App.css";
import { Navbar, IncomingForm } from "./components";
import { MandaueBridge } from "./assets";

function App() {
  return (
    <div className="main">
      <img
        className="mandaue-bridge"
        src={MandaueBridge}
        alt="mandaue-bridge"
      />
      <Navbar />
      <IncomingForm />
    </div>
  );
}

export default App;
