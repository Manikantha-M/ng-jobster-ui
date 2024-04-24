import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';

export const routes: Routes = [
    {path:'stats', component:StatsComponent},
    {path:'all-jobs', component: AllJobsComponent},
    { path: '', redirectTo: '/stats', pathMatch: 'full' }
];
