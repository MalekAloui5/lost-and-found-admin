import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userDetails:any;
constructor(private service: CrudService,private router:Router) { 
   this.userDetails = this.service.userDetails();
  }
}
