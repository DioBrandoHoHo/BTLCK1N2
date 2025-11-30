import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StatsPage from './pages/StatsPage';   // đổi tên từ Dashboard thành StatsPage
import BooksPage from './pages/BooksPage';
import ReadersPage from './pages/ReadersPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Trang thống kê chính */}
        <Route path="/" element={<StatsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/readers" element={<ReadersPage />} />
        <Route path="/stats" element={<StatsPage />} /> {/* route /stats cũng trỏ đến StatsPage */}
      </Routes>
    </Router>
  );
}

export default App;
