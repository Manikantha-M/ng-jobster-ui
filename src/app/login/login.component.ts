import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, FlexLayoutModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private _fb:FormBuilder, private _router:Router, private _dataService:DataService){}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email:['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }
  goToRegister(){
    this._router.navigate(['/register']);
  }
  loginUser() {
    const data = this.loginForm.value;
    this._dataService.post('v1/auth/login', data).subscribe(response => {
      console.log(response)
    })

  }
}
