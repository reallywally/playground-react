import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Parent from "./playground/propsTest/Parent";
import JsonEditor from "./playground/jsonEditorTest/JsonEditor";
import JsonEditor2 from "./playground/jsonEditorTest/JsonEditor2";
import DataTableTest from "./playground/dataTableTest/DataTableTest";
import UseStateTest from "./playground/useStateTest/Main";
import Counter from "./playground/useEffectTest/Counter";
import MindMapTest from "./playground/mindmapTest/MindMapTest";
// import GanttChartMain from "./playground/ganttChart/GanttChartMain";
import GanttChart from "./playground/ganttChart/GanttChart2";
import UseMemoTest from "./playground/useMemoTest/Main";
import UseCallBackTest from "./playground/useCallbackTest/Main";
import FormulaTest from "./playground/formulaTest/FormulaTest";

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
          <Route path="/use-state-test" element={<UseStateTest />} />
          <Route path="/use-effect-test" element={<Counter />} />
          <Route path="/mindmap-test" element={<MindMapTest />} />
          <Route path="/gantt-chart-test" element={<GanttChart />} />
          <Route path="/use-memo-test" element={<UseMemoTest />} />
          <Route path="/use-callback-test" element={<UseCallBackTest />} />
          <Route path="/formula-test" element={<FormulaTest />} />
        </Routes>
      </Layout>
    </Router>
    // <>
    //   <GanttChart />
    // </>
  );
};

export default App;
