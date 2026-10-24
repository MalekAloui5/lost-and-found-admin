import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { ListeadminComponent } from './listeadmin/listeadmin.component';
import { LoginComponent } from './login/login.component';
import { ListeClientComponent } from './listeclient/listeclient.component';
import { ListecontactComponent } from './listecontact/listecontact.component';
import { ListeoffreComponent } from './listeoffre/listeoffre.component';
import { AuthGuard } from './service/AuthGuard.service';
import { HomeComponent } from './home/home.component';
import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { ProfilComponent } from './profil/profil.component';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';




const routes: Routes = [
  {path:'ajouteradmin',component:AjouteradminComponent,canActivate:[AuthGuard]},
  {path:'listeadmin',component:ListeadminComponent,canActivate:[AuthGuard]},
  {path:'',component:LoginComponent},
  {path:'listeclient', component: ListeClientComponent,canActivate:[AuthGuard]},
  {path:'listecontact', component: ListecontactComponent,canActivate:[AuthGuard]},
  {path:'listeoffre', component: ListeoffreComponent,canActivate:[AuthGuard]},
  {path:'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path:'modifieradmin/:id',component:ModifieradminComponent,canActivate:[AuthGuard]},
  {path:'profil', component: ProfilComponent,canActivate:[AuthGuard]},
  {path:'modifierprofil/:id', component: ModifierprofilComponent,canActivate:[AuthGuard]},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
