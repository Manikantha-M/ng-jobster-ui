import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { RegisterComponent } from './register/register.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseLayoutComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-jobster-ui';
  
}
