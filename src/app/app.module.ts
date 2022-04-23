import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PlaceListComponent } from './place-list/place-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbActionsModule, NbInputModule, NbFormFieldModule, NbUserModule, NbAccordionModule, NbTimepickerModule, NbSearchModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule } from '@nebular/theme';
import { AttractionPointsComponent } from './attraction-points/attraction-points.component';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlaceListComponent,
    AttractionPointsComponent,
    TripPlannerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GooglePlaceModule,
    BrowserAnimationsModule,
    DragDropModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbActionsModule,
    NbInputModule,
    NbFormFieldModule,
    NbUserModule,
    NbAccordionModule,
    NbSearchModule,
    NbSidebarModule,
    NbTimepickerModule.forRoot(),
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
