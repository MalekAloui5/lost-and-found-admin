import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouteradminComponent } from './ajouteradmin/ajouteradmin.component';
import { ListeadminComponent } from './listeadmin/listeadmin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule } from '@angular/common/http';
import { ListeClientComponent } from './listeclient/listeclient.component';
import { ListecontactComponent } from './listecontact/listecontact.component';
import { ListeoffreComponent } from './listeoffre/listeoffre.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { ProfilComponent } from './profil/profil.component';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';

@NgModule({
  declarations: [
    AppComponent,
    AjouteradminComponent,
    ListeadminComponent,
    LoginComponent,
    ListeClientComponent,
    ListecontactComponent,
    ListeoffreComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    ModifieradminComponent,
    ProfilComponent,
    ModifierprofilComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
