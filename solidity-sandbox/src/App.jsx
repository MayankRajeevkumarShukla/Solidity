import React from 'react';
import ProjectStructureSidebar from './components/ProjectStructureSidebar';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Solidity Sandbox</h1>
      </header>
      <main className="main-container">
        <ProjectStructureSidebar />
      
        <CodeEditor />
        <OutputPanel />
      </main>
      <footer className="footer">
        <p className="footer-text">Created for Decode with ❤️ by Mayank Shukla</p>
      </footer>
    </div>
  );
};

export default App;
