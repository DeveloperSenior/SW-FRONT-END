import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

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

  constructor(private http: HttpClient,
    private traslate: TranslateService) { }

    ngOnInit(): void {

      this.loadAll();
  
    }
  
    loadAll() {
      this.http.get(`${environment.url}/person`).subscribe((response: any) => {
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
  
          id: this.id.value,
          cdTipoDocumento: this.tipo.value,
          dsNombreCompleto: this.nombre.value,
          dsCelular: this.celular.value,
          dsEmail: this.email.value
  
        }
  
        if (this.isEdit) {
          this.http.put(`${environment.url}/person/${json.id}`, json).subscribe((response) => {
            Swal.fire(this.traslate.instant('generic.titles.confirmation'), this.traslate.instant('generic.messages.process_success'), 'success');
            console.log(response);
            this.isEdit = false;
            this.clearForm();
            this.loadAll();
          });
        } else {
  
          this.http.post(`${environment.url}/person`, json).subscribe((response) => {
            Swal.fire(this.traslate.instant('generic.titles.confirmation'), this.traslate.instant('generic.messages.process_success'), 'success');
            console.log(response);
            this.isEdit = false;
            this.clearForm();
            this.loadAll();
          });
        }
  
      } else {
        alert("Ingrese los campos obligatorios")
      }
  
    }
    clearForm(){
      this.id.setValue('');
      this.tipo.setValue('');
      this.nombre.setValue('');
      this.celular.setValue('');
      this.email.setValue('');
    }
  
    edit(data: any) {
      this.isEdit = true;
      this.id.setValue(data.id);
      this.tipo.setValue(data.cdTipoDocumento);
      this.nombre.setValue(data.dsNombreCompleto);
      this.celular.setValue(data.dsCelular);
      this.email.setValue(data.dsEmail);
  
    }

}
