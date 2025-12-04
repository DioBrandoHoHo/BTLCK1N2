import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import './App.css';
import StatsPage from './pages/StatsPage';
import BooksPage from './pages/BooksPage';
import ReadersPage from './pages/ReadersPage';
import BorrowChart from './components/BorrowChart';
import { getHealth } from './api';

function App() {
  useEffect(() => {
    getHealth()
      .then((res) => {
        console.log("✅ Backend health:", res.data.ok);
      })
      .catch((error) => {
        console.error("❌ Lỗi gọi API:", error);
      });
  }, []);

  return (
    <div className="page-frame">
      <Router>
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/stats" replace />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/readers" element={<ReadersPage />} />
            <Route path="/borrows-chart" element={<BorrowChart />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
