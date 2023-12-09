import "./assets/style/Style.scss";
import Routes from "./routes/Index";
import { useBeforeunload } from "react-beforeunload";

function App() {
  useBeforeunload((event: { preventDefault: () => void }) => {
    event.preventDefault();
  });

  return <Routes />;
}

export default App;
