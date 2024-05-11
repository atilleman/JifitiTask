import { Injectable } from '@angular/core';
import { FormData } from '../data/formData';

@Injectable({
  providedIn: 'root'
})

export class FormService {

  constructor() {}

  getFormStructure() {
    return FormData;
  }
}

