import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  view: [number, number] = [1120, 650];
  showLegend: boolean = true;
  showLabels: boolean = false; // Masquer les étiquettes des axes X et Y
  animations: boolean = true;
  xAxis: boolean = false; // Masquer l'axe X
  yAxis: boolean = true;
  timeline: boolean = false;
  data: any[] = []; // Les données pour le graphique
  colorScheme: Color = {
    domain: [
      '#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600',
      '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#f6c339',
      '#7a5195', '#d04a35', '#7f8d4f', '#b8c1a7', '#a1c4e6',
      '#f1a9a0', '#e6b0aa', '#c0392b', '#e74c3c', '#ecf0f1',
      '#bdc3c7', '#3498db', '#2980b9', '#2ecc71', '#27ae60',
      '#16a085', '#1abc9c', '#f39c12', '#f1c40f', '#e67e22'      // Ajoutez plus de couleurs si nécessaire
    ],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Profile Distribution',
  };
  gradient: boolean = false;

  constructor(private cvService: CvService) { }

  ngOnInit(): void {
    this.cvService.getCVs().subscribe(response => {
      console.log("Response from service:", response);

      // Assurez-vous que nous accédons bien à la propriété 'cvs'
      const cvsArray = response.cvs || [];

      // Comptage des profils de candidats
      const categories = cvsArray.reduce((acc: { [key: string]: number }, cv: { candidate_profile: string }) => {
        acc[cv.candidate_profile] = (acc[cv.candidate_profile] || 0) + 1;
        return acc;
      }, {});

      this.data = Object.keys(categories).map(profile => ({
        name: profile,
        value: categories[profile]
      }));

      console.log("Data for chart:", this.data); // Vérifiez le format des données ici
    });
  }


}
