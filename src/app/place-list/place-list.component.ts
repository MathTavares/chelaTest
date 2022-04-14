import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { IPlaceModel, PlaceModel } from '../models/placeModel';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit, OnChanges {

  listOfPlaces: IPlaceModel[] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<IPlaceModel []>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  deletePlace(place : google.maps.places.PlaceResult){
    this.listOfPlaces.forEach( (item, index) => {
      if(item === place) this.listOfPlaces.splice(index,1);
    });
  }

}
