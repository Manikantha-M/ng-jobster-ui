import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../data.service';
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
      count: 0,
      iocn: 'work_history',
      title: 'Pending Applications',
      color:'#E8B949'
    },
    {
      count: 0,
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
  singleBarChart = [];
  // view: any = [700, 400];
  view: any = [window.innerWidth/1.2, 400];
   // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'No of Applications';

  colorScheme:any = {
    domain: ['#3B81F6']
  };
  constructor(private _dataService:DataService) {}
  ngOnInit() {
    setTimeout(()=>{
      this.getAllStats();
      },0);
  }
  getAllStats(){
    this._dataService.hideSpinner = false;
    this._dataService.get('v1/jobs/stats').subscribe({next: data =>{
      const {stats} = data;
      this.statCards[0].count = stats.pending;
      this.statCards[1].count = stats.interview;
      this.statCards[2].count = stats.declined;
      this.singleBarChart = data.monthlyApplications;
      this._dataService.hideSpinner = true;
    }, error:error =>{
      // console.log(error);
      this._dataService.showSnackbar('Failed to fetch chart data')
      this._dataService.hideSpinner = true;
    }})
  }
  onSelect(event:any) {
    // console.log(event);
  }

}
