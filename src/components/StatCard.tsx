import './StatCard.css';

interface StatCardProps {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
