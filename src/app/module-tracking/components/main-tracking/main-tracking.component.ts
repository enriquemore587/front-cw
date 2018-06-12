import { Component, OnInit } from "@angular/core";

import { trackingService } from "../../services/tracking.service";
import { log } from "util";

import * as moment from "moment";
@Component({
  selector: "app-main-tracking",
  templateUrl: "./main-tracking.component.html",
  styleUrls: ["./main-tracking.component.css"],
  providers: [trackingService]
})
export class MainTrackingComponent implements OnInit {
  public title = "Tracking";
  public processRequest: any[] = [];
  public showButton;
  public timer: number;

  constructor(private _TrackingService: trackingService) {}

  ngOnInit() {
    this.showButton = true;
  }

  InitConsult(showItemButton) {
    this.showButton = showItemButton;
    if(!showItemButton){
      var now = moment();
      var dateMon = now.format();
      this.timer = <any> setInterval(() => {
        this.InitrequestProcess(dateMon);
      }, 300);
    }else{
      clearTimeout(this.timer);
      // this.processRequest = [];
    }
  }

  InitrequestProcess(dateMon) {
    this._TrackingService.getTracking(dateMon).subscribe(resp => {
      if (resp.status === 0) {
        this.processRequest = resp.data;
      }
    });
  }
}
