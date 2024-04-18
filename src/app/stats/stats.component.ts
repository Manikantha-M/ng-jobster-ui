import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export interface StatCard {
  count: number,
  iocn:string,
  title:string,
  color:string
}
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [FlexLayoutModule, MatIconModule, NgxChartsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  statCards: StatCard [] = [
    {
      count: 28,
      iocn: 'work_history',
      title: 'Pending Applications',
      color:'#E8B949'
    },
    {
      count: 25,
      iocn: 'event_available',
      title: 'Interviews Scheduled',
      color:'#6379CB'
    },
    {
      count: 0,
      iocn: 'event_busy',
      title: 'Jobs Declined',
      color:'#D66A6A'
    }
  ]; 
  singleBarChart = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];
  // view: any = [700, 400];
  view: any = [window.innerWidth/1.2, 400];
   // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme:any = {
    domain: ['#3B81F6']
  };
  onSelect(event:any) {
    // console.log(event);
  }

}
