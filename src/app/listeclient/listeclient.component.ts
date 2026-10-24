import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../Entity/Client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listeclient',
  templateUrl: './listeclient.component.html',
  styleUrls: ['./listeclient.component.css']
})
export class ListeClientComponent implements OnInit {
  listeClient: Client[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.chargerClients();
  }

  chargerClients() {
    this.service.getClient().subscribe({
      next: (clients: Client[]) => {
        this.listeClient = clients;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des clients:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des clients'
        });
      }
    });
  }

  DeleteClient(client: Client) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le client "${client.nom} ${client.prenom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteClient(client.id).subscribe({
          next: () => {
            this.listeClient = this.listeClient.filter(c => c.id !== client.id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le client a été supprimé avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err: any) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du client.'
            });
          }
        });
      }
    });
  }

  editClient(client: Client) {
    this.router.navigate(['/modifierclient', client.id]);
  }
}