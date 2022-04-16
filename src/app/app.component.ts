import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { environment } from 'src/environments/environment';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PlaceListComponent } from './place-list/place-list.component';
import { IPlaceModel, PlaceModel } from './models/placeModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    
  }


}
