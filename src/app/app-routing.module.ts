import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AttractionPointsComponent } from './attraction-points/attraction-points.component';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';

const routes: Routes = [
  {path: '', component: TripPlannerComponent},
  {path: 'app', component: AttractionPointsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
