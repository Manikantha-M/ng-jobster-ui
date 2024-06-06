import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from '../data.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, FlexLayoutModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profileForm!: FormGroup;
  constructor(private _fb:FormBuilder, public _dataService:DataService){}

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      name:[this._dataService.userObj.name, [Validators.required]],
      lastName:[this._dataService.userObj.lastName, [Validators.required]],
      email:[this._dataService.userObj.email, [Validators.required]],
      location:[this._dataService.userObj.location, [Validators.required]]
    })
  }
  updateUser() {
    this._dataService.hideSpinner = false;
    const data = this.profileForm.value;
    this._dataService.patch('v1/auth/updateUser', data).subscribe({next: data =>{
      this._dataService.token = data.token;
      this._dataService.userObj = data.user;
      this._dataService.showSnackbar('Profile updated!');
      this._dataService.hideSpinner = true;
    },
    error: error => {
      this._dataService.showSnackbar(error.error?.msg);
      this._dataService.hideSpinner = true;
    }})
  }
}
