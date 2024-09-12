import React from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { GroupsList } from "./components/GroupsList";
import { JoinGroup } from "./pages/JoinGroup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import GroupContextLayout from "./layouts/GroupContextLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route element={<GroupContextLayout />}>
            <Route path="groups">
              <Route path="my-groups" element={<GroupsList />} />
              <Route
                path="join/:group"
                element={<JoinGroup />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
