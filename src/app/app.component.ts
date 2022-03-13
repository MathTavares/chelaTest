import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'google-maps';

  private map: google.maps.Map | undefined;
  private infoWindow: google.maps.InfoWindow | undefined;

  ngOnInit(): void {

    let loader = new Loader({
      apiKey: environment.GOOGLE_APIKEY,
    });
    loader.load().then(() => {

      const location = { lat: 51.233334, lng: 	6.783333 }

      let htmlMap = document.getElementById("map");
      if(htmlMap != null){
        this.infoWindow = new google.maps.InfoWindow();
        this.map = new google.maps.Map(htmlMap, {
          center: location,
          zoom: 6,
          styles: styles
        });

        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
        });
      }
    })
  }
  /**
   * activate geolocation and set the pin on the current location
   * @returns 
   */
  findMyLocation(): void{
    console.log("sono qui");
    if(this.infoWindow === undefined )
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
          if(this.infoWindow != undefined)
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
  createPin(customPosition: google.maps.MarkerOptions["position"]): void{
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
  
}
