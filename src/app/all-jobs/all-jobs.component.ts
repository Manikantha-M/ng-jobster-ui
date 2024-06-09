import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [FlexLayoutModule, ReactiveFormsModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.scss'
})
export class AllJobsComponent implements OnInit {
  searchForm!: FormGroup;
  statusArr = [
    {value: 'all', viewValue: 'all'},
    {value: 'interview', viewValue: 'interview'},
    {value: 'declined', viewValue: 'declined'},
    {value: 'pending', viewValue: 'pending'}
  ];
  typeArr = [
    {value: 'all', viewValue: 'all'},
    {value: 'full-time', viewValue: 'full-time'},
    {value: 'part-time', viewValue: 'part-time'},
    {value: 'remote', viewValue: 'remote'},
    {value: 'internship', viewValue: 'internship'}
  ];

  sortArr = [
    {value: 'latest', viewValue: 'latest'},
    {value: 'oldest', viewValue: 'oldest'},
    {value: 'a-z', viewValue: 'a-z'},
    {value: 'z-a', viewValue: 'z-a'}
  ];
  pageSize = 5;
  pageIndex = 0;
  pageOffset = this.pageSize * this.pageIndex;
  searchResultList: any[] = [];
  searchResultLength: number = 0;
  displayedColumns: string[] = ['position', 'company', 'jobLocation', 'createdAt'];
  dataSource:any = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _fb:FormBuilder, private _dataService:DataService, private _router: Router){}
  ngOnInit() {
    this.searchForm = this._fb.group({
      search: [''],
      status: ['all'],
      jobType: ['all'],
      sort: ['latest']
    });
    setTimeout(()=>{
      this.getAllJobs(`v1/jobs?pageIndex=${this.pageIndex}&limit=${this.pageSize}`);
      },0);
  };
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  getAllJobs(path:string){
    this._dataService.hideSpinner = false;
    this._dataService.get(path).subscribe({next: data => {
      this.searchResultList = data.jobs;
      this.dataSource = new MatTableDataSource(data.jobs);
      this.searchResultLength = data.count;      
      this._dataService.showSnackbar('Results Fetched!');
      this._dataService.hideSpinner = true;
    }, error: error => {
      this._dataService.showSnackbar(error.error?.msg);
      this._dataService.hideSpinner = true;
    }})
  }

  editJob(job:object){
    this._dataService.editJobObj = job;
    this._router.navigate(['/home/add-job']);
  }

  deleteJob(jobID:string){
    this._dataService.hideSpinner = false;
    this._dataService.delete(`v1/jobs/${jobID}`).subscribe({next: data => {
      this._dataService.showSnackbar('Deleted Job!');
      this.getAllJobs(`v1/jobs?pageIndex=${this.pageIndex}&limit=${this.pageSize}`);
    }, 
    error: error => {
      this._dataService.showSnackbar(error.error?.msg);
      this._dataService.hideSpinner = true;
    }})

  }

  filterChange(){
    this._dataService.hideSpinner = false;
    const filterObj = this.searchForm.value;
    let queryParams = `?status=${filterObj.status}&jobType=${filterObj.jobType}&sort=${filterObj.sort}&page=${this.pageIndex}`;
    if(filterObj.search) queryParams += `&search=${filterObj.search}`;
    this.getAllJobs(`v1/jobs${queryParams}`);
  };

  pageEvent(event:any){
    console.log(event, 'pagination event');
    this.getAllJobs(`v1/jobs?pageIndex=${event.pageIndex}&limit=${event.pageSize}`);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.searchResultLength = 51
    // console.log(`v1/jobs?pageIndex=${event.pageIndex}&limit=${event.pageSize}`)
    
  }
}
