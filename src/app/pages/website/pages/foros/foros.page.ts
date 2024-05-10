import { Component, OnInit } from '@angular/core';
import { HeaderStatusService } from 'src/app/shared/services/active-header.service';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {

  constructor(
    public headerStatusService:HeaderStatusService
  ) { }

  ngOnInit() {
  }

}
