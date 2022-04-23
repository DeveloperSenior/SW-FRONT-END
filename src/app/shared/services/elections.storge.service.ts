/**
 *
 * @author SmartJugle S.A.S - 2020
 *
 */
import { Injectable } from '@angular/core';
import { AppProperties } from '../../utils/elections.util';

const STORAGE_KEY = 'userSession';

@Injectable()
export class ElectionsStorageService{

  appProperties: AppProperties = new AppProperties();

  set(data: any, key?: string): void{
      localStorage.setItem(key !== undefined ? key : btoa( STORAGE_KEY + '-' + this.appProperties.app ), btoa(JSON.stringify(data)));
  }
  get(key?: string): any {
    const value = localStorage.getItem(key !== undefined && key !== null ? key : btoa( STORAGE_KEY + '-' + this.appProperties.app ));
    return value !== null && value !== undefined ? JSON.parse(atob(value)) : null;
  }

  setSession(data: any, key?: string): void{
      sessionStorage.setItem(key !== undefined ? key : btoa( STORAGE_KEY + '-' + this.appProperties.app ), btoa(JSON.stringify(data)));
  }
  getSession(key?: string): any {
    const value = sessionStorage.getItem(key !== undefined && key !== null ? key : btoa( STORAGE_KEY + '-' + this.appProperties.app ));
    return value !== null && value !== undefined ? JSON.parse(atob(value)) : null;
  }

  remove(key?: string): void{
    localStorage.removeItem(key !== undefined ? key : btoa( STORAGE_KEY + '-' + this.appProperties.app ));
  }

  clear(): void{
    localStorage.clear();
  }

  length(): number{
    return localStorage.length;
  }

  removeSession(key?: string): void{
    sessionStorage.removeItem(key !== undefined ? key : btoa( STORAGE_KEY + '-' + this.appProperties.app ));
  }

  clearSession(): void{
    sessionStorage.clear();
  }

  lengthSession(): number{
    return sessionStorage.length;
  }


}
