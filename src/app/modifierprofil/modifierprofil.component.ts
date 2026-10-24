import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import Swal from 'sweetalert2';
import { Admin } from '../Entity/Admin.Entity';

@Component({
  selector: 'app-modifierprofil',
  templateUrl: './modifierprofil.component.html',
  styleUrls: ['./modifierprofil.component.css']
})
export class ModifierprofilComponent implements OnInit {
  id!: number;
  updateadminForm: FormGroup;
  adminDetails: any;
  isSuperAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateadminForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern("[a-zA-Z .'-]+"), Validators.minLength(4)]],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      mdp: [''],
      role: ['', Validators.required],
    });

    this.adminDetails = this.service.userDetails();
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    const currentUser = this.service.userDetails();
    if (currentUser && currentUser.role) {
      const role = currentUser.role.toLowerCase().trim();
      this.isSuperAdmin = (role === 'superadmin' || role === 'super admin');
    }

    this.service.getAdminById(this.id).subscribe((admin) => {
      if (admin) {
        this.adminDetails = admin;
        this.updateadminForm.patchValue({
          nom: admin.nom,
          prenom: admin.prenom,
          email: admin.email,
          mdp: '',
          role: admin.role,
        });

        if (!this.isSuperAdmin) {
          this.updateadminForm.get('role')?.disable();
        }
      }
    });
  }
  

  updateadmin(): void {
    if (this.updateadminForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir correctement tous les champs.',
      });
      return;
    }

    const formData = this.updateadminForm.value;
    let motDePasse = formData.mdp;
    if (!motDePasse || motDePasse.trim() === '') {
      motDePasse = this.adminDetails.mdp;
    }

    const admin = new Admin(
      this.id,
      formData.nom,
      formData.prenom,
      formData.email,
      motDePasse,
      formData.role
    );

    this.service.updateAdmin(this.id, admin).subscribe({
      next: (res: any) => {
        localStorage.setItem("isadminIn", res.token);
        this.adminDetails = res.admin;

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Votre profil a été modifié avec succès !',
        });

        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Échec de la mise à jour du profil.',
        });
      }
    });
  }
}
