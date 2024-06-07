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

  searchResultList: any[] = [];

  displayedColumns: string[] = ['position', 'company', 'jobLocation', 'createdAt'];
  dataSource:any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _fb:FormBuilder, private _dataService:DataService){}
  ngOnInit() {
    this.searchForm = this._fb.group({
      search: [''],
      status: ['all'],
      type: ['all'],
      sort: ['latest']
    });
    this.getAllJobs();
  };
  getAllJobs(){
    this._dataService.get('v1/jobs').subscribe({next: data => {
      console.log(data.jobs, 'jobs list');
      this.searchResultList = data.jobs;
      this.dataSource = new MatTableDataSource(data.jobs);
      this.dataSource.paginator = this.paginator;
    }, error: error => {
    }})
  }
}
