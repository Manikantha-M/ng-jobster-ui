import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, EmailValidator} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, FlexLayoutModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registrationForm!: FormGroup;
  constructor(private _fb:FormBuilder, private _router:Router){}

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
}
