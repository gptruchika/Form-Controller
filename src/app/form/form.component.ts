import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  userForm: FormGroup;
  file: File | null = null;
  userList: any[] = [];

  constructor(private fb: FormBuilder ,private dataService: FormDataService , private route : Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, this.validatePhoneNumber]],
      profilePic: [null, [Validators.required]]
    });
  }

  

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileSizeInKB = selectedFile.size / 1024;

      if (fileSizeInKB >= 500 && fileSizeInKB <= 1024) {
        this.file = selectedFile;
        this.userForm.patchValue({ profilePic: selectedFile });
      } else {
        alert('File size must be between 500 KB and 1 MB');
        this.resetFileInput(event.target);
      }
  }
  }
  resetFileInput(input: any) {
    input.value = '';
    this.userForm.patchValue({ profilePic: null });
    this.file = null;
  }

  validatePhoneNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumber = control.value;
    const valid = /^\d{10}$/.test(phoneNumber);
    return valid ? null : { 'invalidPhoneNumber': true };
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)!;
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userList.push(this.userForm.value);
      this.dataService.setUserList(this.userList);
      alert('Details Submitted');
      this.dataService.markAsSubmitted();
      this.route.navigateByUrl("userList");
      this.userForm.reset();
    } else {
      this.validateAllFormFields(this.userForm);
    }
  }

  isFieldInvalid(field: string) {
    const control = this.userForm.get(field)!;
    return control.invalid && control.touched;
  }

  
}
