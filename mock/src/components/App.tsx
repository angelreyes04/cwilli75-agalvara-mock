import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import { Select } from "./select/Select";

/**
 * This is the highest level of Mock which builds the component APP;
 *
 * @return JSX of the entire mock
 *  Note: if the user is loggedIn, the main interactive screen will show,
 *  else it will stay at the screen prompting for log in
 */
function App({}: { children: React.ReactNode; modal: React.ReactNode }) {
  /**
   * A state tracker for if the user is logged in and
   *  a function to update the logged-in state
   */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <div className="App-header">
        <h1 aria-label="Mock Header">Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      {isLoggedIn && <Select />}
      <div id="modal-root"></div>
    </div>
  );
}
export default App;
