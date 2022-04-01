import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { environment } from 'src/environments/environment';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //#region PROPERTIES

  title = 'google-maps';

  private map: google.maps.Map | undefined;
  private infoWindow: google.maps.InfoWindow | undefined;
  private _searchPlace = '';

  get SearchPlace(): string {
    return this._searchPlace;
  }

  set SearchPlace(value: string) {
    this._searchPlace = value;
  }
  //#endregion 


  ngOnInit(): void {

    let loader = new Loader({
      apiKey: environment.GOOGLE_APIKEY,
      libraries: ['places']
    });
    loader.load().then(() => {

      const location = { lat: 51.233334, lng: 6.783333 }

      let htmlMap = document.getElementById("map");
      if (htmlMap != null) {
        this.infoWindow = new google.maps.InfoWindow();
        this.map = new google.maps.Map(htmlMap, {
          center: location,
          zoom: 6,
          styles: styles
        });

        this.initAutocomplete();
      }
    });
  }

  /**
   * activate geolocation and set the pin on the current location
   * @returns 
   */
  findMyLocation(): void {
    if (this.infoWindow === undefined)
      return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.infoWindow?.setPosition(pos);
          //this.infoWindow?.open(this.map);
          this.map?.setCenter(pos);
          this.createPin(pos);
          this.map?.setZoom(9);
        },
        () => {
          if (this.infoWindow != undefined)
            this.handleLocationError(true, this.infoWindow, this.map?.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map?.getCenter()!);
    }
  }

  /**
   * create a pin on the map base on the input position
   * @param customPosition position for create the pin on the map
   */
  createPin(customPosition: google.maps.MarkerOptions["position"]): void {
    const marker = new google.maps.Marker({
      position: customPosition,
      map: this.map,
    });
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  /**Create the searchBox for the locations  */
  initAutocomplete(): void {

    const map: google.maps.Map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      }
    );

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map?.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places?.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places?.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map?.fitBounds(bounds);
    });
  }

}
