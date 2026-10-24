import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Offre } from '../Entity/Offre.Entity'; 
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listeoffre',
  templateUrl: './listeoffre.component.html',
  styleUrls: ['./listeoffre.component.css']
})
export class ListeoffreComponent implements OnInit {
  listeContact: Offre[] = [];
  listeOffre: Offre[];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.chargerContacts();
  }

  chargerContacts(): void {
    this.service.getOffre().subscribe({
      next: (offres: Offre[]) => {
        this.listeOffre = offres;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des contacts:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger la liste des contacts'
        });
      }
    });
  }

  DeleteOffre(offre: Offre): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le message de "${offre.titre}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteOffre(offre.id).subscribe({
          next: () => {
            this.listeOffre = this.listeOffre.filter(c => c.id !== offre.id);

            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'L offre a été supprimé avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err: any) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du offre.'
            });
          }
        });
      }
    });
  }
}