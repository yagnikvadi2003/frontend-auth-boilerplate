import React from "react";

import { ReactComponent as ReactLogo } from '@assets/svgs/react.svg';
import reactLogo from "@assets/images/download.png";

import "./app.css";

/**
 * @component App
 * The root component of the application.
 *
 * This component is a functional React component that renders the main content
 * of the application. It's the entry point for all other components.
 *
 * @returns {JSX.Element}
 * A JSX element that renders a `div` containing the text "App".
 */
const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1>React User Management</h1>
      <ReactLogo width={50} height={50}/>
      <img src={reactLogo} alt="React logo" className="react-logo" />
    </div>
  );
};

export default App;
