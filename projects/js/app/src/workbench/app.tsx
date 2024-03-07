/*
 * File: @mas/desktop/src/workbench/app.tsx
 *
 * Copyright (c) 2024 Maspectra Dev Team
 */

import * as React from "react";

import { sayHi } from "@hello-bazel/hello";

const App: React.FC = () => {
  React.useEffect(() => {
    sayHi({
      log: console.info,
    });
  }, []);
  return (
    <button
      onClick={() => {
        sayHi({
          log: console.warn,
        });
      }}
    >
      Click Me
    </button>
  );
};

export default App;
