import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, FlexLayoutModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;
  constructor(private _fb:FormBuilder){}

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      location:['']
    })
  }
}
