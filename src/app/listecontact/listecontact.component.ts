import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contact } from '../Entity/Contact.Entity'; 
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listecontact',
  templateUrl: './listecontact.component.html',
  styleUrls: ['./listecontact.component.css']
})
export class ListecontactComponent implements OnInit {
  listeContact: Contact[] = [];

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.chargerContacts();
  }

  chargerContacts(): void {
    this.service.getContact().subscribe({
      next: (contacts: Contact[]) => {
        this.listeContact = contacts;
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

  DeleteContact(contact: Contact): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le message de "${contact.nom}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.onDeleteContact(contact.id).subscribe({
          next: () => {
            // Mise à jour de la liste locale après suppression
            this.listeContact = this.listeContact.filter(c => c.id !== contact.id);

            Swal.fire({
              icon: 'success',
              title: 'Supprimé !',
              text: 'Le contact a été supprimé avec succès.',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (err: any) => {
            console.error('Erreur lors de la suppression:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression du contact.'
            });
          }
        });
      }
    });
  }
}