import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient , HttpEventType } from '@angular/common/http';


@Component({
  selector: 'companyRegistration',
  templateUrl: './companyRegistration.component.html',
})

export class companyRegistration implements OnInit {
  title = 'angularFormValidationTask';

  registerationForm: FormGroup;
  submitted = false;
  uploaded = false;
  uploadedfront = false;
  ext:String = null;
  selectedFile:File = null;
  fileError = false;
  http: HttpClient;
  constructor(private formBuilder:FormBuilder){};
  
  ngOnInit(){
    this.registerationForm = this.formBuilder.group({
      // company info
      companyName: ['', Validators.required],
      employerSalary: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      companyWebsite: ['', [Validators.required, Validators.pattern(/^(http(s?):\/\/)?(www\.)+[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/)]],
      employersNumber:  ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    
      // sign info
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required ,Validators.pattern(/^[0-9]{9}/)]],
      email: ['', [Validators.required , Validators.email]],

      //back of id file
      backOfId: ['', [Validators.required]]

    });
  }
get formData(){
  return this.registerationForm.controls;
}

// upload front file
onFileChangedfront(event) {
  this.uploadedfront = true;
  this.selectedFile = event.target.files[0];
  this.http.post('url', this.selectedFile.name, {
      reportProgress: true,
      observe: 'events'
  }).subscribe(event => {
    if(event.type === HttpEventType.UploadProgress){
   
      console.log('uploaded' + (event.loaded / event.total) *100 + '%')
    }
    else{
      console.log('uploaded successfully');
      this.uploadedfront = false;
    }
  });
  
}

onFileChangedBack(event) {
  this.uploaded = true;
  this.selectedFile = event.target.files[0];
  this.ext = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.') + 1);
  if(this.ext == "pdf"){
  this.http.post('url', this.selectedFile.name, {
      reportProgress: true,
      observe: 'events'
  }).subscribe(event => {
    if(event.type === HttpEventType.UploadProgress){
   
      console.log('uploaded' + (event.loaded / event.total) *100 + '%')
    }
    else{
      console.log('uploaded successfully');
      this.uploaded = false;
    }
  });
  this.formData['backOfId'].setErrors(null);

  }
  else{
    this.formData['backOfId'].setErrors({ fileExtError: true });
    this.fileError = true;
    console.log(this.formData.backOfId.errors.fileExtError);
  }
}
  onSubmit(){
    this.submitted = true;
    // console.log('res ' + this.formData.companyName.value)
  }
}
