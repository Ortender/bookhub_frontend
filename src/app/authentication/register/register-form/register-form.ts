import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication-service';
import { ResponseRegister } from '../../../interfaces/authentication/response-register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {

  private authenticationService : AuthenticationService = inject(AuthenticationService);
  private router : Router = inject (Router);

  submitted : boolean = false;

  public registerForm : FormGroup = new FormGroup ({
    lastName : new FormControl('', [Validators.required, Validators.maxLength(150)]),
    firstName : new FormControl('', [Validators.required, Validators.maxLength(150)]),
    email : new FormControl('',[Validators.required, Validators.maxLength(250), Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/), Validators.maxLength(255)]),
    gdpr : new FormControl(false , Validators.requiredTrue)
  })

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.hasError(errorName) && (control.touched || control.dirty || this.submitted));
  }

  public registerUser(){
    this.submitted = true;

    if(this.registerForm.valid){
      const { lastName, firstName, email, password, gdpr } = this.registerForm.getRawValue()
      this.authenticationService.register(lastName, firstName, email, password, gdpr).subscribe({
        next : (response) => {
          //TODO : faire le service de notificaiton centralisé
          this.router.navigate(['/login'])},
        error: (err) => alert(err.error)
      })
    } else {
      this.registerForm.markAllAsTouched();
      return;
    }
  }

}
