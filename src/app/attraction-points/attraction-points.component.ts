import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-attraction-points',
  templateUrl: './attraction-points.component.html',
  styleUrls: ['./attraction-points.component.css']
})
export class AttractionPointsComponent implements OnInit {

  value = '';

  constructor(private searchService: NbSearchService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })
  }

  ngOnInit(): void {
  }

}
