import "./App.css";
import HomePage from "./pages/homepage/Homepage";
import { Switch, Route } from "react-router-dom";
import TextToBraile from "./pages/text-braille/TextToBraile";
import BrailleKeyboard from "./pages/braille-keyboard/BrailleKeyboard";
import BrailleToText from "./pages/braille-text/BrailleTOtext";
import SignLanguage from "./pages/sign-language-converter/SignLanguage";
import Header from "./components/Header/Header";

const HatsPage = () => (
  <div>
    <h1>Learn More Page</h1>
  </div>
);

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/braile-keyboard" component={BrailleKeyboard} />
        <Route exact path="/text-braile" component={TextToBraile} />
        <Route path="/learn-more" component={HatsPage} />
        <Route path="/braile-converter" component={BrailleToText} />
        <Route path="/sign-language-converter" component={SignLanguage} />
      </Switch>
    </div>
  );
}

export default App;
