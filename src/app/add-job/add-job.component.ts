import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from '../data.service';
@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatSelectModule, FlexLayoutModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss'
})
export class AddJobComponent implements OnInit{
  pageTitle = 'Add Job';
  editJobReq: boolean = false;
  addJobForm!: FormGroup;
  statusArr = [
    // {value: 'all', viewValue: 'all'},
    {value: 'interview', viewValue: 'interview'},
    {value: 'declined', viewValue: 'declined'},
    {value: 'pending', viewValue: 'pending'}
  ];
  typeArr = [
    // {value: 'all', viewValue: 'all'},
    {value: 'full-time', viewValue: 'full-time'},
    {value: 'part-time', viewValue: 'part-time'},
    {value: 'remote', viewValue: 'remote'},
    {value: 'internship', viewValue: 'internship'}
  ];
  constructor(private _fb:FormBuilder, public _dataService:DataService){}
  
  ngOnInit() {
    this.addJobForm = this._fb.group({
      position:[''],
      company:[''],
      jobLocation:[this._dataService.userObj.location],
      status: ['pending'],
      jobType: ['full-time']
    });
    const editJobObj = this._dataService.editJobObj;
    if(Object.values(editJobObj || {}).length > 0) {
      this.pageTitle = 'Edit Job';
      this.addJobForm.patchValue(editJobObj);
      this.editJobReq = true;
    }
  };
  addAJob() {
    this._dataService.hideSpinner = false;
    const data = this.addJobForm.value;

    if(this.editJobReq){
      this._dataService.patch(`v1/jobs/${this._dataService.editJobObj._id}`, data).subscribe({
        next: data =>{
          this._dataService.showSnackbar('Job Updated!');
          this._dataService.hideSpinner = true;
          this.pageTitle = 'Add Job';
          this._dataService.editJobObj = {};
          this.editJobReq = false;
        }, error: error => {
          this._dataService.showSnackbar(error.error?.msg);
          this._dataService.hideSpinner = true;
        }
      })
    }
    else{
      this._dataService.post('v1/jobs', data).subscribe({next: data =>{
        this._dataService.showSnackbar('Job Created!');
        this._dataService.hideSpinner = true;
      }, error: error =>{
        this._dataService.showSnackbar(error.error?.msg);
        this._dataService.hideSpinner = true;
      }});
    }
  };

  ngOnDestroy(){
    this._dataService.editJobObj = {};
  }
}
