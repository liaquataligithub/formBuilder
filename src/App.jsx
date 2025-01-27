import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { KanbanBoard } from './components/KanbanBoard';
import { FormBuilder } from './components/FormBuilder';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/kanban" element={<KanbanBoard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 