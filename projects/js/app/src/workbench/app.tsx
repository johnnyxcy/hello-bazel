/*
 * File: @mas/desktop/src/workbench/app.tsx
 *
 * Copyright (c) 2024 Maspectra Dev Team
 */

import * as React from "react";

const App: React.FC = () => {
  React.useEffect(() => {
    console.log("hello");
  }, []);
  return <div>Hello</div>;
};

export default App;
