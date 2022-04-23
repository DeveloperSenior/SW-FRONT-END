import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('personTableSort') sort: MatSort;
  @ViewChild('personPaginator') personPaginator: MatPaginator;

  personList: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email'];
  personDataSource = new MatTableDataSource<any>(this.personList);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/person').subscribe( (response: any) =>{
      console.log(response);
      this.personList = response;
    });


  }

}
