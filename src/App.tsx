// Importing react related
// import { useState } from "react";
import { useSelector } from "react-redux";

// Importing store
import { selectGlobals } from "./store/Globals";

// Importing ours
import { Header, Shortcuts } from "./components";

function App() {
  // Store
  const globals = useSelector(selectGlobals);

  return (
    <div
      className={`bg-default ${
        !globals.background_image_use_default && globals.background_image
          ? ""
          : "bg-shark"
      } bg-center bg-no-repeat bg-cover h-screen`}
      style={{
        backgroundImage:
          globals.background_image && !globals.background_image_use_default
            ? `url('${globals.background_image}')`
            : undefined,
      }}
    >
      <Header />
      <Shortcuts />
    </div>
  );
}

export default App;
