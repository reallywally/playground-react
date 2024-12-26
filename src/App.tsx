import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Parent from "./playground/useEffectTest/Parent";
import JsonEditor from "./playground/jsonEditorTest/JsonEditor";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/playground" element={<Parent />} />
          <Route path="/json-editor" element={<JsonEditor />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
