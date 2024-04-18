import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { routes } from '../app.routes';

export interface Section {
  name: string;
  icon: string;
}
@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatRadioModule, RouterModule, MatIconModule, MatListModule, MatToolbarModule, FlexLayoutModule, MatMenuModule],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss'
})
export class BaseLayoutComponent {
  mode :any= 'side';
  shouldRun = true;
  sindeMenu = [
    {
      name: 'Stats',
      icon:'signal_cellular_alt',
      route:'stats'
    },
    {
      name: 'All Jobs',
      icon: 'query_stats',
      route:'all-jobs'
    },
    {
      name: 'Add Job',
      icon: 'post_add',
      route:'add-job'
    },
    {
      name: 'Profile',
      icon: 'contact_page',
      route:'profile'
    }
  ];
}
