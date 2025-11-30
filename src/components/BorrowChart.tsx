import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function BorrowChart() {
  const labels = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
    'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
    'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  // Dữ liệu gốc (ví dụ)
  const rawData = [12, 19, 15, 22, 30, 25, 18, 20, 27, 35, 40, 80];

  // Áp dụng điều kiện: nếu >200 thì hiển thị 200
  const cappedData = rawData.map(val => (val > 200 ? 200 : val));

  // Tìm giá trị lớn nhất sau khi capped
  const maxValue = Math.max(...cappedData);

  // Nếu maxValue < 200 → trục Y co lại cho cân đối
  const yMax = maxValue < 200 ? Math.ceil(maxValue * 1.1) : 200;

  const data = {
    labels,
    datasets: [
      {
        label: 'Lượt mượn sách',
        data: cappedData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#1d4ed8',
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Poppins, sans-serif',
            size: 12,
            weight: '600',
          },
        },
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Lượt mượn sách theo tháng',
        font: {
          family: 'Poppins, sans-serif',
          size: 16,
          weight: '700',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const originalValue = rawData[context.dataIndex];
            return originalValue > 200
              ? `Tháng ${context.dataIndex + 1}: 200+ lượt`
              : `Tháng ${context.dataIndex + 1}: ${originalValue} lượt`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yMax, // 👈 tự động điều chỉnh
        ticks: {
          font: {
            family: 'Poppins, sans-serif',
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Poppins, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
}
