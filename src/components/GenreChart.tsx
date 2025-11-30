import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function GenreChart() {
  // Dữ liệu gốc (ví dụ)
  const rawData = [220, 180, 90, 50, 30, 15, 10];

  // Áp dụng điều kiện: nếu >200 thì hiển thị 200
  const cappedData = rawData.map(val => (val > 200 ? 200 : val));
  const total = cappedData.reduce((a, b) => a + b, 0);

  const data = {
    labels: [
      'Văn học', 'Khoa học', 'Lịch sử',
      'Kinh tế', 'Y học', 'Công nghệ', 'Khác'
    ],
    datasets: [
      {
        label: 'Thể loại',
        data: cappedData,
        backgroundColor: [
          '#93c5fd', '#fcd34d', '#f87171',
          '#34d399', '#a78bfa', '#fb923c', '#9ca3af'
        ],
        borderColor: '#fff',
        borderWidth: 2,
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
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Phân bổ thể loại sách',
        font: {
          family: 'Poppins, sans-serif',
          size: 16,
          weight: '700',
        },
      },
      datalabels: {
        color: '#000',
        font: {
          family: 'Poppins, sans-serif',
          size: 11,
          weight: '500',
        },
        formatter: (value: number) => {
          const percentage = (value / total) * 100;
          // 👇 Nếu phần trăm < 5% thì không hiển thị trên lát
          return percentage < 5 ? '' : percentage.toFixed(1) + '%';
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const originalValue = rawData[context.dataIndex];
            const percentage = ((cappedData[context.dataIndex] / total) * 100).toFixed(1);
            const valueText = originalValue > 200 ? '200+ sách' : `${originalValue} sách`;
            return `${context.label}: ${valueText} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '350px', height: '250px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
