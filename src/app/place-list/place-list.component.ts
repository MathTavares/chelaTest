import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  ownedAnimal = [
    "dog",
    "cat",
    "fish",
    "rabbit"
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<string []>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

  }

  

}
