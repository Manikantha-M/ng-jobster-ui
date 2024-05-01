import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

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
export class BaseLayoutComponent implements OnInit{
  mode :any= 'side';
  shouldRun = true;
  sideMenu: any[]= [
    {
      name: 'Stats',
      icon:'signal_cellular_alt',
      route:'/stats',
      selected: true
    },
    {
      name: 'All Jobs',
      icon: 'query_stats',
      route:'/all-jobs',
      selected: false
    },
    {
      name: 'Add Job',
      icon: 'post_add',
      route:'/add-job',
      selected: false
    },
    {
      name: 'Profile',
      icon: 'contact_page',
      route:'/profile',
      selected: false
    }
  ];
  constructor(private _router: Router){}
  ngOnInit(): void {
  //   if(this._router === '/register')
  //   console.log(true)
  }
  navTo(item: any){
    this.sideMenu.find(item => item.selected).selected = false;
    item.selected = true;
    this._router.navigate([item.route]);
  }
  
}
