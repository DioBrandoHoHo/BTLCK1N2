import { useState } from 'react';
import StatCard from '../components/StatCard';
import BorrowChart from '../components/BorrowChart';
import GenreChart from '../components/GenreChart';
import './StatsPage.css';   // đổi tên file css cho khớp

export default function StatsPage() {
  const [open, setOpen] = useState(false);

  const handleExport = (type: string) => {
    alert(`Xuất dữ liệu dạng ${type}`);
    setOpen(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Thống kê thư viện</h1>

      {/* Các thẻ thống kê */}
      <div className="stats-row">
        <StatCard title="Tổng số sách" value={123} />
        <StatCard title="Tổng lượt mượn" value={456} />
        <StatCard title="Người đọc" value={78} />
        <StatCard title="Đang mượn" value={9} />
      </div>

      {/* Biểu đồ */}
      <div className="charts">
        <div className="chart-box">
          <BorrowChart />
        </div>
        <div className="chart-box">
          <GenreChart />
        </div>
      </div>

      {/* Nút export */}
      <div className="export-menu">
        <button onClick={() => setOpen(!open)}>Export</button>
        {open && (
          <div className="export-options">
            <button onClick={() => handleExport('CSV')}>CSV</button>
            <button onClick={() => handleExport('Excel')}>Excel</button>
            <button onClick={() => handleExport('PDF')}>PDF</button>
          </div>
        )}
      </div>
    </div>
  );
}
