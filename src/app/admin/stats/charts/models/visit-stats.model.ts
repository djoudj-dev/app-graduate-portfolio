import { DataPoint } from '../services/visit-stats.service';

export interface Visit {
  _id?: string;
  timestamp: Date;
  page: string;
  duration?: number;
  userAgent?: string;
  referrer?: string;
}

export interface VisitStats {
  period: 'day' | 'week' | 'month' | 'year';
  total: number;
  average: number;
  peak: number;
  lowest: number;
  data: DataPoint;
}
