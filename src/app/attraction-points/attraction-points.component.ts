import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { AttractionsService } from '../models/attractions.service';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { FeatureCollection, GeoJsonGeometryTypes } from 'geojson';
import { GeoJsonPropertiesExt } from '../models/GeoJsonPropertiesExt';

@Component({
  selector: 'app-attraction-points',
  templateUrl: './attraction-points.component.html',
  styleUrls: ['./attraction-points.component.css']
})
export class AttractionPointsComponent implements AfterViewInit {

  searchPlace = '';
  geoAttractions: GeoJsonPropertiesExt[] = [];

  constructor(private searchService: NbSearchService, private attractionService: AttractionsService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchPlace = data.term;
        //let itemsToGet = this.attractionService.attractionsGet();

      });

  }


  ngOnInit(): void {
    //this.onInitWithGeoapi();
    let loader = new Loader({
      apiKey: environment.GOOGLE_APIKEY,
      libraries: ['places']
    });

    loader.load().then(() => {
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input,);

      searchBox.addListener("places_changed", async () => {
        let places = searchBox.getPlaces();
        if (places === undefined || places.length <= 0) {
          return;
        }
        let lat = places[0].geometry?.location?.lat();
        let lng = places[0].geometry?.location?.lng();
        if (lat !== undefined && lng !== undefined) {
          // let test = await this.attractionService.attractionsGet(lat, lng);
          // console.log(test);
          let featureCollection = await this.attractionService.getAttractions(lng, lat);
          this.setAttractions(featureCollection);
        }

      });
    });
  }

  setAttractions(featureCollection: FeatureCollection) {

    let attractionList: GeoJsonPropertiesExt[] = [];

    featureCollection.features.forEach(feature => {
      let geoParse: GeoJsonPropertiesExt = JSON.parse(JSON.stringify(feature.properties));
      attractionList.push(geoParse);
    });

    this.geoAttractions = attractionList;
  }


  ngAfterViewInit(): void {
    // Create the search box and link it to the UI element.
  }

}
