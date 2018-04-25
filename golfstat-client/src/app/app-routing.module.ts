import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RoundsComponent } from './rounds/rounds.component';
import { GolfersComponent } from './golfers/golfers.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/landingPage', pathMatch: 'full' },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'rounds', component: RoundsComponent },
  { path: 'golfers', component: GolfersComponent },
  { path: 'courses', component: CoursesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
