import { DataPoint } from '../services/stats.service';

export interface Visit {
  _id?: string;
  timestamp: Date;
  page: string;
  duration?: number;
  userAgent?: string;
  referrer?: string;
}

export interface VisitStats {
  period: string;
  data: DataPoint;
  total: number;
  average: number;
  peak: {
    value: number;
    date: Date;
  };
  lowest: {
    value: number;
    date: Date;
  };
}
