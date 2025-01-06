import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Parent from "./playground/propsTest/Parent";
import JsonEditor from "./playground/jsonEditorTest/JsonEditor";
import JsonEditor2 from "./playground/jsonEditorTest/JsonEditor2";
import DataTableTest from "./playground/dataTableTest/DataTableTest";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/props-test" element={<Parent />} />
          <Route path="/json-editor" element={<JsonEditor2 />} />
          <Route path="/data-table-test" element={<DataTableTest />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
