import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { CrudService } from '../service/crud.service';
import { Offre } from '../Entity/Offre.Entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalAdmin: number = 0;
  totalClient: number = 0;
  totalExpert: number = 0;
 

  myGroup: FormGroup;

  private percentageChart?: Chart;
  private timer: any;
  totalOffre: number;
  totaloffre: number;

  constructor(private router: Router, private service: CrudService) {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });

    Chart.register(...registerables);
  }

  ngOnInit(): void {
   
    this.loadStats();
  
    this.timer = setInterval(() => {
      this.loadStats();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);

    
    if (this.percentageChart) {
      this.percentageChart.destroy();
      this.percentageChart = undefined;
    }
  }

  loadStats() {
  
forkJoin({
  admins: this.service.getAdmins(),
  clients: this.service.getClient(),
  offres: this.service.getOffre()
}).subscribe({
  next: ({ admins, clients, offres }) => {
    this.totalAdmin = admins?.length || 0;
    this.totalClient = clients?.length || 0;
    this.totalOffre = offres?.length || 0;

    this.renderOrUpdatePercentageChart();
  },
  error: (err) => {
    console.error('Erreur loadStats:', err);
  }
});

  }
/* chart.js (ai)*/
  renderOrUpdatePercentageChart() {
    const total =
      this.totalAdmin +
      this.totalClient +
      this.totaloffre

    const percentageAdmin = total ? (this.totalAdmin / total) * 100 : 0;
    const percentageClient = total ? (this.totalClient / total) * 100 : 0;
    const percentageoffre = total ? (this.totalOffre / total) * 100 : 0;

    if (this.percentageChart) {
      this.percentageChart.data.labels = [
        'Admin',
        'Client',
        'offre',
     
      ];

      this.percentageChart.data.datasets[0].data = [
        percentageAdmin,
        percentageClient,
        percentageoffre,
       
      ];

      this.percentageChart.update();
      return;
    }
   
    this.percentageChart = new Chart('percentageCanvas', { /*id dans html*/
      type: 'pie', 
      data: {
        labels: ['Admin', 'Client', 'Expert'],
        datasets: [{
          label: 'Pourcentage global',
          data: [
            percentageAdmin,
            percentageClient,
            percentageoffre
          ],
          backgroundColor: [
            '#0d6efd',
            '#198754', 
            '#ffc107'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Pourcentage Admin / Client / Expert '
          },
          tooltip: {
            callbacks: {
label: (ctx) => `${ctx.label}: ${Number(ctx.raw)?.toFixed(1)} %`
            }
          }
        }
      }
    });
  }


}
