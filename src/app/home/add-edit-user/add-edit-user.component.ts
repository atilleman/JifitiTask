import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/users';
import { FormService } from 'src/app/services/form-service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  id = 'app-add-edit-user';
  submitted = false;
  dynamicForm: FormGroup;
  curUser: User;
  isSave = false;
  isReady = false;
  pageDesc = '';

  constructor(private formBuilder: FormBuilder, 
              public formService: FormService,
              public childDialogRef: MatDialogRef<AddEditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit() {
    if (!this.childDialogRef.id) {
      return;
    }

    if (this.data?.first_name) {
      this.pageDesc = "Edit user's personal info";
    } else {
      this.pageDesc = "Fill out new user's personal info";
    }
    
    const formStructure = this.formService.getFormStructure();
    let formGroup = {};

    formStructure.forEach(control => {
      let controlValidators: Validators[] = [];
 
      if (control.validators) {
        control.validators.forEach(validation => {
          if (validation === 'required') controlValidators.push(Validators.required);
        });
      }

      let displayLabel: any;
      if (this.data?.first_name) {
        this.curUser = this.data;
        displayLabel = [this.data[control.key] || '', controlValidators];
      } else {
        displayLabel = ['', controlValidators];
      }

      formGroup[control.label] = displayLabel;
    });
    this.dynamicForm = this.formBuilder.group(formGroup);
    this.isReady = true;
  }

  saveData() {
    if (this.isValid()) {
      this.curUser = {
        first_name: this.dynamicForm.value["First Name"],
        last_name: this.dynamicForm.value["Last Name"],
        email: this.dynamicForm.value["Email"],
        phone: this.dynamicForm.value["Phone"]
      }
      this.isSave = true;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.dynamicForm.invalid) {
      return;
    }
  }

  isValid() {
    return this.dynamicForm.valid;
  }

  returnToList() {
    this.childDialogRef.close(this.curUser);
  }

  getErrorMessage(control) {
    return control.label + ' is required!';
  }
}
