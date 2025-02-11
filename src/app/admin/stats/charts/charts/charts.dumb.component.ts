import { Component, input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts-dumb',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="h-[250px]">
      <canvas baseChart [data]="chartData()" [options]="chartOptions" [type]="'bar'"> </canvas>
    </div>
  `
})
export class ChartsDumbComponent {
  chartData = input.required<ChartConfiguration<'bar'>['data']>();

  protected readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(var(--color-tertiary), 0.1)'
        },
        ticks: {
          color: 'rgb(var(--color-text))'
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: 'rgb(var(--color-text))'
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
