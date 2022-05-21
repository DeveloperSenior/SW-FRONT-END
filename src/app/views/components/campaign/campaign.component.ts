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
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {


  @ViewChild('TableSort') sort: MatSort;
  @ViewChild('campaignPaginator') campaignPaginator: MatPaginator;

  id = new FormControl('', [Validators.required]);
  @ViewChild('inputId') idField: ElementRef;

  nombre = new FormControl('', [Validators.required]);
  @ViewChild('inputNombre') nombreField: ElementRef;

  codigo = new FormControl('', [Validators.required]);
  @ViewChild('inputCodigo') codigoField: ElementRef;



  campaignList: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'actions'];
  campaignDataSource = new MatTableDataSource<any>(this.campaignList);

  isEdit = false;

  constructor(private http: HttpClient,
    private traslate: TranslateService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.http.get(`${environment.url}/campaign`).subscribe((response: any) => {
      this.campaignList = response;
      this.campaignDataSource = new MatTableDataSource(this.campaignList);
      this.campaignDataSource.paginator = this.campaignPaginator;
      this.campaignDataSource.sort = this.sort;
    });
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.campaignDataSource.filter = filterValue.trim().toLowerCase();
  }

  save() {
    if (this.id.value !== undefined && this.nombre.value !== undefined
       && this.codigo.value != undefined ) {

      let json = {
        id:0,
        cdCampana: this.codigo.value,
        dsCampana: this.nombre.value
      }

      if (this.isEdit) {
        json.id = Number(this.id.value);
        this.http.put(`${environment.url}/campaign/${this.id.value}`, json).subscribe((response) => {
          Swal.fire(this.traslate.instant('generic.titles.confirmation'), this.traslate.instant('generic.messages.process_success'), 'success');
          console.log(response);
          this.isEdit = false;
          this.clearForm();
          this.loadAll();
        });
      } else {

        this.http.post(`${environment.url}/campaign`, json).subscribe((response) => {
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
    this.codigo.setValue('');
    this.nombre.setValue('');
  }

  edit(data: any) {
    this.isEdit = true;
    this.id.setValue(data.id);
    this.codigo.setValue(data.cdCampana);
    this.nombre.setValue(data.dsCampana);

  }

}
