import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { DataService } from '../data.service';
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
  sideMenu: any[]= [
    {
      name: 'Stats',
      icon:'signal_cellular_alt',
      route:'home/stats',
      selected: true
    },
    {
      name: 'All Jobs',
      icon: 'query_stats',
      route:'home/all-jobs',
      selected: false
    },
    {
      name: 'Add Job',
      icon: 'post_add',
      route:'home/add-job',
      selected: false
    },
    {
      name: 'Profile',
      icon: 'contact_page',
      route:'home/profile',
      selected: false
    }
  ];
  constructor(private _router: Router, public _dataService: DataService){}
  navTo(item: any){
    this.sideMenu.find(item => item.selected).selected = false;
    item.selected = true;
    this._router.navigate([item.route]);
  }
  logoutUser(){
    this._router.navigate(['/login'])
  }
}
