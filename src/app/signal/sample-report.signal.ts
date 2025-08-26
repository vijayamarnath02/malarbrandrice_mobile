import { signal } from '@angular/core';

// Example signal for list of reports
export const sampleReportListSignal = signal<any>({});

// Example signal for selected report
export const selectedReportSignal = signal<any | null>(null);
