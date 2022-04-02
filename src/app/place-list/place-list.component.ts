import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit, OnChanges {

  listOfPlaces: string[] = [];

  @Input()
  newPlaceResult!: google.maps.places.PlaceResult;
  prevPlaceResult!: google.maps.places.PlaceResult;

  constructor() { }

  ngOnInit(): void {
    this.prevPlaceResult = this.newPlaceResult;
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.prevPlaceResult !== this.newPlaceResult && this.newPlaceResult !== undefined ){
      this.prevPlaceResult = this.newPlaceResult;
      if(this.prevPlaceResult?.name !== undefined)
        this.listOfPlaces.push(this.prevPlaceResult.name);
    }
  }

  onDrop(event: CdkDragDrop<string []>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }





}
