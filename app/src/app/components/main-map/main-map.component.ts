import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import "leaflet.markercluster";
import { HttpClient } from '@angular/common/http';
import { GeoJsonObject } from 'geojson';
@Component({
  selector: "app-main-map",
  templateUrl: "./main-map.component.html",
  styleUrls: ["./main-map.component.scss"]
})
export class MainMapComponent implements OnInit {
  constructor(private http:HttpClient) {}

  ngOnInit() {
    var mainmap = L.map("mainmap", {

    }).setView([7.946527, -1.023194], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      noWrap: true,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mainmap);

    var myIcon = L.icon({
      iconUrl: "../../../assets/pindrop-512.png",
      iconRetinaUrl: "../../../assets/pindrop-512.png",
      iconSize: [29, 29],
      iconAnchor: [9, 21],
      popupAnchor: [5, -18]
    });
    this.http.get<GeoJsonObject>("assets/ghanafinal.geojson").subscribe(res => {
      console.log(res);
      L.geoJSON(res).addTo(mainmap)
    });
    // this.http.get<GeoJsonObject>("assets/distributiongridecowas2017.geojson").subscribe(res => {
    //   console.log(res);
    //   L.geoJSON(res).addTo(mainmap)
    // });
    this.http.get<any[]>("assets/markers.json").subscribe(res => {
      var markerClusters = L.markerClusterGroup();
      res.forEach(marker => {  
        var popup = marker.name +
              '<br/>' + marker.city +
              '<br/><b>IATA/FAA:</b> ' + marker.iata_faa +
              '<br/><b>ICAO:</b> ' + marker.icao +
              '<br/><b>Altitude:</b> ' + Math.round( marker.alt * 0.3048 ) + ' m' +
              '<br/><b>Timezone:</b> ' + marker.tz;

              var m = L.marker( [marker.lat, marker.lng], {icon: myIcon} )
              .bindPopup( popup );
              markerClusters.addLayer( m );
      });
      mainmap.addLayer(markerClusters)
    })
  }
}
