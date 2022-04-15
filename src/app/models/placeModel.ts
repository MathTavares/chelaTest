export interface IPlaceModel {
    placeResult: google.maps.places.PlaceResult;
    hours: number;  
    minutes: number;  
}

export class PlaceModel implements IPlaceModel {
   public placeResult!: google.maps.places.PlaceResult;
   public hours!: number;  
   public minutes!: number;  

    constructor(placeResult: google.maps.places.PlaceResult){
        this.placeResult = placeResult;
        this.hours = 0;
        this.minutes = 0;
    }

}