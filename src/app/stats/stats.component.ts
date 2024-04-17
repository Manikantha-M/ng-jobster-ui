import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

export interface StatCard {
  count: number,
  iocn:string,
  title:string,
  color:string
}
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [FlexLayoutModule, MatIconModule],
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
  ] 
}
