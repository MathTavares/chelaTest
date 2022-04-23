import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FeatureCollection, Feature } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  constructor(private http: HttpClient) { }

  attractionList : string[];

  private async attractionsGet(longitude: number, latitude: number) : Promise<JSON>{
    let templateUrl = new URL(`https://api.geoapify.com/v2/places`);
    templateUrl.searchParams.append("categories","entertainment,tourism");
    
    templateUrl.searchParams.append("filter",`circle:${longitude.toString()},${latitude.toString()},5000`);
    templateUrl.searchParams.append("bias", `proximity:${longitude.toString()},${latitude.toString()}`);
    templateUrl.searchParams.append("lang", "it");
    templateUrl.searchParams.append("limit", "20");
    templateUrl.searchParams.append("apiKey", environment.GEOAPIFY);

    let resp = await fetch(templateUrl.href);
    // let test = await resp.json();
    // console.log("test =  " + test);

    return resp.json();

  }

  async getAttractions(longitude: number, latitude: number) : Promise<FeatureCollection>{

    let response = await this.attractionsGet(longitude, latitude);
    let obj: FeatureCollection = JSON.parse(JSON.stringify(response));

    return obj;
  }
  
}
