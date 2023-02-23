import "./App.css";
import Hangman from "./components/Hangman";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="App">
      <Hangman />
    </div>
  );
};

export default App;
