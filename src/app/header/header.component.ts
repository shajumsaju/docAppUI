import { Component, OnInit} from '@angular/core';
import * as moment from 'moment'
import {CommanServiceService} from '../shared/comman-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private commanService:CommanServiceService) { }

  ngOnInit() {
  }
  

  filterDate(event: string | Date) {
    console.log(event)
    let setterValue;

    if (event!= null) {
      setterValue = moment(event).format("YYYY-MM-DD")
    }
    else {
      setterValue = null;
    }
    this.commanService.getDate(setterValue)
  


  }



}
