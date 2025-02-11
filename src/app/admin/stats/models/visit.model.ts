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
  data: {
    labels: string[];
    values: number[];
  };
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
