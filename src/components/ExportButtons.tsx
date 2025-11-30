interface ExportButtonsProps {
  onCSV: () => void;
  onPDF: () => void;
  onExcel: () => void;
}

export default function ExportButtons({ onCSV, onPDF, onExcel }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button className="btn" onClick={onCSV}>Export Borrowings CSV</button>
      <button className="btn" onClick={onPDF}>Export Borrowings PDF</button>
      <button className="btn" onClick={onExcel}>Export Books Excel</button>
    </div>
  );
}
