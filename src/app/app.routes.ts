import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

export const routes: Routes = [
    {
        path: 'home', component: BaseLayoutComponent, 
        children: [
            {path: 'stats',component: StatsComponent,},
            { path: 'all-jobs', component: AllJobsComponent },
            { path: 'add-job', component: AddJobComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/home/stats', pathMatch: 'full' }
];
