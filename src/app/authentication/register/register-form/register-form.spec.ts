import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication-service';
import { NotificationService } from '../../../services/notification-service';
import { of, throwError } from 'rxjs';

import { RegisterForm } from './register-form';

describe('RegisterForm', () => {
  let component: RegisterForm;
  let fixture: ComponentFixture<RegisterForm>;
  let router : Router;
  let navigateSpy: ReturnType<typeof vi.fn>;

  const authServiceMock = {
    register : vi.fn()
  };

  const notificationServiceMock = {
    success: vi.fn(),
    error: vi.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        {provide : AuthenticationService, useValue: authServiceMock },
        {provide : NotificationService, useValue: notificationServiceMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForm);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)

    navigateSpy = vi.fn().mockResolvedValue(true);
    (router as any).navigate = navigateSpy;

    fixture.detectChanges();
  });

  it('should be invalid when required fields are missing', () => {
    component.registerForm.setValue({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      gdpr: false
    });

    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should be invalid when RGPD checkbox is not checked', () => {
    component.registerForm.setValue({
      lastName: 'Tonneau',
      firstName: 'Charles',
      email: 'charles@test.com',
      password: 'Password123!',
      gdpr: false
    });

    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should call register service when form is valid', () => {
    authServiceMock.register.mockReturnValue(of({}));

    component.registerForm.setValue({
      lastName: 'Tonneau',
      firstName: 'Charles',
      email: 'charles@test.com',
      password: 'Password123!',
      gdpr: true
    });

    component.registerUser();

    expect(authServiceMock.register).toHaveBeenCalled();
  });

  it('should show success notification and navigate to login on success', () => {
    authServiceMock.register.mockReturnValue(of({}));

    component.registerForm.setValue({
      lastName: 'Tonneau',
      firstName: 'Charles',
      email: 'charles@test.com',
      password: 'Password123!',
      gdpr: true
    });

    component.registerUser();

    expect(notificationServiceMock.success).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show error notification on register failure', () => {
    authServiceMock.register.mockReturnValue(throwError(()=> new Error('Register failed')));

    component.registerForm.setValue({
      lastName: 'Tonneau',
      firstName: 'Charles',
      email: 'charles@test.com',
      password: 'Password123!',
      gdpr: true
    });

    component.registerUser();

    expect(notificationServiceMock.error).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });


});
