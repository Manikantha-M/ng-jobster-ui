import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, FlexLayoutModule,SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;
  hideSpinner: boolean = true;
  constructor(private _fb:FormBuilder, private _router:Router, private _dataService: DataService){}

  ngOnInit(): void {
    this.registrationForm = this._fb.group({
      name:['', Validators.required],
      email:['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }
  goTologin(){
    this._router.navigate(['/login'])
  }
  registerUser(){
    this.hideSpinner = false;
    const data = this.registrationForm.value;
    this._dataService.post('v1/auth/register', data).subscribe({next: data => {
      console.log('Data:', data);
      sessionStorage.setItem('jobsterAPI', JSON.stringify(data));
      this._dataService.token = data.token;
      this._dataService.userObj = data.user;
      this._dataService.showSnackbar(`Welcome ${data.user.name}`);
      this._router.navigate(['/home/stats']);
      this.hideSpinner = true;
    },
    error: error => {
      this._dataService.showSnackbar(error.error?.msg);
      this.hideSpinner = true;
    }})
  }
}
