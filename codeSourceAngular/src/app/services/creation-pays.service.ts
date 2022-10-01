import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pays } from '../models/pays';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class CreationPaysService {

  baseUrl : String = "http://localhost:4200/api/employees";
  client: HttpClient;

  constructor(client:HttpClient) { 
    this.client = client;
  }
}
