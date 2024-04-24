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
@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [FlexLayoutModule, ReactiveFormsModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatPaginatorModule],
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

  searchResultList: any[] = [
      {
        "_id": "661d70a2274fcd3e5632f607",
        "company": "Hoppe and Sons",
        "position": "GIS Technical Architect",
        "status": "declined",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "part-time",
        "jobLocation": "my city",
        "createdAt": "2022-08-09T00:46:14.000Z",
        "updatedAt": "2022-08-09T00:46:14.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f63e",
        "company": "Kilback-Morissette",
        "position": "Human Resources Manager",
        "status": "interview",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "internship",
        "jobLocation": "my city",
        "createdAt": "2022-08-06T21:17:03.000Z",
        "updatedAt": "2022-08-06T21:17:03.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f630",
        "company": "Ward and Sons",
        "position": "Graphic Designer",
        "status": "interview",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "remote",
        "jobLocation": "my city",
        "createdAt": "2022-08-06T19:00:39.000Z",
        "updatedAt": "2022-08-06T19:00:39.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f635",
        "company": "Schowalter, Smith and Boyle",
        "position": "Information Systems Manager",
        "status": "pending",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdAt": "2022-08-03T17:37:33.000Z",
        "updatedAt": "2022-08-03T17:37:33.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f646",
        "company": "Toy, Witting and Moen",
        "position": "Account Executive",
        "status": "declined",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdAt": "2022-08-03T07:08:07.000Z",
        "updatedAt": "2022-08-03T07:08:07.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f612",
        "company": "Cruickshank and Sons",
        "position": "Actuary",
        "status": "declined",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "remote",
        "jobLocation": "my city",
        "createdAt": "2022-07-22T18:06:19.000Z",
        "updatedAt": "2022-07-22T18:06:19.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f60c",
        "company": "Swift Group",
        "position": "Staff Accountant II",
        "status": "interview",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "part-time",
        "jobLocation": "my city",
        "createdAt": "2022-07-13T08:56:08.000Z",
        "updatedAt": "2022-07-13T08:56:08.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f619",
        "company": "Weber-Walker",
        "position": "Financial Advisor",
        "status": "interview",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "internship",
        "jobLocation": "my city",
        "createdAt": "2022-07-11T05:28:00.000Z",
        "updatedAt": "2022-07-11T05:28:00.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f641",
        "company": "Pagac-Davis",
        "position": "Structural Engineer",
        "status": "interview",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdAt": "2022-07-04T19:51:53.000Z",
        "updatedAt": "2022-07-04T19:51:53.000Z",
        "__v": 0
      },
      {
        "_id": "661d70a2274fcd3e5632f64c",
        "company": "Orn LLC",
        "position": "Marketing Assistant",
        "status": "interview",
        "createdBy": "661d70085cc1037099a12cb3",
        "jobType": "internship",
        "jobLocation": "my city",
        "createdAt": "2022-07-04T11:29:41.000Z",
        "updatedAt": "2022-07-04T11:29:41.000Z",
        "__v": 0
      }
    ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.searchResultList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _fb:FormBuilder){}
  ngOnInit() {
    this.searchForm = this._fb.group({
      search: [''],
      status: ['all'],
      type: ['all'],
      sort: ['latest']
    })
  }
}
