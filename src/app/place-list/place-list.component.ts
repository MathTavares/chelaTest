import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef  } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { IPlaceModel } from '../models/placeModel';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
})
export class PlaceListComponent implements OnInit, OnChanges {

  listOfPlaces: IPlaceModel[] = [];

  constructor(  private changeDetection: ChangeDetectorRef) { }
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

  addNewPlace(newPlaceResult: IPlaceModel){
    this.listOfPlaces = this.listOfPlaces.concat(newPlaceResult);
    this.changeDetection.detectChanges();
  }

  deletePlace(place : IPlaceModel){
    this.listOfPlaces.forEach( (item, index) => {
      if(item === place) this.listOfPlaces.splice(index,1);
    });
  }

}
