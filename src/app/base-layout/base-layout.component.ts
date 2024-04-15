import { Component } from '@angular/core';
// import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatRadioModule],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss'
})
export class BaseLayoutComponent {
  mode :any= 'side';
  shouldRun = true;
}
