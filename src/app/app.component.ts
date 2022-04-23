import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('personTableSort') sort: MatSort;
  @ViewChild('personPaginator') personPaginator: MatPaginator;

  tipo = new FormControl('', [Validators.required]);
  @ViewChild('inputTipo') tipoField: ElementRef;

  id = new FormControl('', [Validators.required]);
  @ViewChild('inputId') idField: ElementRef;

  nombre = new FormControl('', [Validators.required]);
  @ViewChild('inputNombre') nombreField: ElementRef;

  celular = new FormControl('', [Validators.required]);
  @ViewChild('inputCelular') celularField: ElementRef;

  email = new FormControl('', [Validators.required]);
  @ViewChild('inputEmail') emailField: ElementRef;


  personList: any[] = [];
  displayedColumns: string[] = ['tipo', 'id', 'nombre', 'celular', 'email', 'actions'];
  personDataSource = new MatTableDataSource<any>(this.personList);

  types = ['CC', 'NI', 'RT']

  isEdit = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.loadAll();

  }

  loadAll() {
    this.http.get('http://127.0.0.1:8000/person').subscribe((response: any) => {
      this.personList = response;
      this.personDataSource = new MatTableDataSource(this.personList);
      this.personDataSource.paginator = this.personPaginator;
      this.personDataSource.sort = this.sort;
    });
  }

  applySaleFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.personDataSource.filter = filterValue.trim().toLowerCase();
  }

  save() {
    if (this.tipo.value !== undefined && this.id.value !== undefined && this.nombre.value !== undefined
       && this.celular.value != undefined && this.email !== undefined) {

      let json = {

        CdDocumento: this.id.value,
        CdTipoDocumento: this.tipo.value,
        DsNombreCompleto: this.nombre.value,
        DsCelular: this.celular.value,
        DsEmail: this.email.value

      }

      if (this.isEdit) {
        this.http.put('http://127.0.0.1:8000/person', json).subscribe((response) => {
          alert(response);
          this.isEdit = false;
          this.loadAll();
        });
      } else {

        this.http.post('http://127.0.0.1:8000/person', json).subscribe((response) => {
          alert(response);
          this.isEdit = false;
          this.id.setValue('');
          this.tipo.setValue('');
          this.nombre.setValue('');
          this.celular.setValue('');
          this.email.setValue('');
          this.loadAll();
        });
      }

    } else {
      alert("Ingrese los campos obligatorios")
    }

  }

  edit(data: any) {
    this.isEdit = true;
    this.id.setValue(data.CdDocumento);
    this.tipo.setValue(data.CdTipoDocumento);
    this.nombre.setValue(data.DsNombreCompleto);
    this.celular.setValue(data.DsCelular);
    this.email.setValue(data.DsEmail);

  }

}
