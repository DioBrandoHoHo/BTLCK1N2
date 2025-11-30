import { useEffect, useState } from 'react';
import { getOverview, getBorrowsByMonth, getTopBooks, getOverdueReaders,
  Overview, BorrowByMonth, TopBook, OverdueReader } from '../services/api';

export function useDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [borrowsByMonth, setBorrowsByMonth] = useState<BorrowByMonth[]>([]);
  const [topBooks, setTopBooks] = useState<TopBook[]>([]);
  const [overdueReaders, setOverdueReaders] = useState<OverdueReader[]>([]);

  useEffect(() => {
    getOverview().then(r => setOverview(r.data.data));
    getBorrowsByMonth(12).then(r => setBorrowsByMonth(r.data.data));
    getTopBooks(10).then(r => setTopBooks(r.data.data));
    getOverdueReaders().then(r => setOverdueReaders(r.data.data));
  }, []);

  return { overview, borrowsByMonth, topBooks, overdueReaders };
}
