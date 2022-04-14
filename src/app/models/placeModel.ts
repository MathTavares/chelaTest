export interface IPlaceModel {
    placeResult: google.maps.places.PlaceResult;
    dwellTime: any;
}

export class PlaceModel implements IPlaceModel {
   public placeResult!: google.maps.places.PlaceResult;
   public dwellTime!: any;

    constructor(placeResult: google.maps.places.PlaceResult){
        this.placeResult = placeResult;
        this.dwellTime = new Date();
        this.dwellTime.setHours(0,0,0,0);
    }

}