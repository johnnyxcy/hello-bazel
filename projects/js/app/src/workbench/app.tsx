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
      log: console.log,
    });
  }, []);
  return <div>Hello</div>;
};

export default App;
