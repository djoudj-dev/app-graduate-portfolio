import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts-dumb',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="w-full h-[400px]">
      <canvas baseChart [data]="chartData" [options]="chartOptions" [type]="'bar'"> </canvas>
    </div>
  `
})
export class ChartsDumbComponent {
  @Input({ required: true }) chartData!: ChartConfiguration<'bar'>['data'];

  protected readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 215, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
}
