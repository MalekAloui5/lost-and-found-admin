import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entity/Admin.Entity';
import { Client } from '../Entity/Client.Entity';
import { Contact } from '../Entity/Contact.Entity';


import { Observable } from 'rxjs';
import { Offre } from '../Entity/Offre.Entity';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  getAdmins(): Observable<Admin[]> {
  return this.http.get<Admin[]>(`${this.apiUrl}/admin`);
}

 
  
  helper=new JwtHelperService();
  apiUrl='http://localhost:8081/api';
  loginurl='http://localhost:8081/api/admin/login';
  constructor(private http:HttpClient) { }
  addadmin(admin:Admin){
    return this.http.post<any>(this.apiUrl+"/admin", admin);
  
  }
  getAdmin(id: number, number: any): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl +"/admin");
  }
  getAdminById(id: number): Observable<Admin> {
  return this.http.get<Admin>(`${this.apiUrl}/admin/${id}`);
}
  onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}` 
    return this.http.delete(url )
  }
  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + "/client");
  }

  onDeleteClient(id : number){
    const url = `${this.apiUrl+"/client"}/${id}`;
    return this.http.delete(url);
  }
  getContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl + "/contact");
  }

  onDeleteContact(id : number){
    const url = `${this.apiUrl+"/contact"}/${id}`;
    return this.http.delete(url);
  }
  addoffre(offre:Offre){
    return this.http.post<any>(this.apiUrl+"/offre", offre);
  
  }
  getOffre(): Observable<Offre[]>{
    return this.http.get<Offre[]>(this.apiUrl +"/offre");
  }
  onDeleteOffre(id : number){
    const url =`${this.apiUrl+"/offre"}/${id}` 
    return this.http.delete(url )
  }
  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginurl, admin);
  }
  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  userDetails(){
    let token:any=localStorage.getItem('myToken'); 
    let decodeToken= this.helper.decodeToken(token); 
     return decodeToken.data; 
   }
   updateAdmin(id:number,admin: Admin) {
    const url = `${this.apiUrl+"/admin"}/${id}`
    return this.http.put<any>(url,admin);
  }
   findAdminById(id : number): Observable<Admin> {
    const url =` ${this.apiUrl + "/admin"}/${id}`;
    return this.http.get<Admin>(url)
  }

  }
  
