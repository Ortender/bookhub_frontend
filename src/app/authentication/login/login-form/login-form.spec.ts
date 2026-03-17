import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';

import { LoginForm } from './login-form';
import { AuthenticationService } from '../../../services/authentication-service';
import { NotificationService } from '../../../services/notification-service';
import { SessionService } from '../../../services/session-service';
import { of, throwError } from 'rxjs';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;
  let router : Router;
  let navigateSpy: ReturnType<typeof vi.fn>;

  const authServiceMock = {
    login: vi.fn()
  };

  const notificationServiceMock = {
    success: vi.fn(),
    error: vi.fn()
  };

  const sessionServiceMock = {
    setUser: vi.fn()
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginForm],
      providers: [
        provideRouter([]),
        {provide : AuthenticationService, useValue: authServiceMock },
        {provide : NotificationService, useValue: notificationServiceMock},
        {provide: SessionService, useValue: sessionServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)

    navigateSpy = vi.fn().mockResolvedValue(true);
    (router as any).navigate = navigateSpy;

    fixture.detectChanges();
  });

  it('should not submit if form is invalid', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    component.logUser();

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should call login service with form values', () => {
    authServiceMock.login.mockReturnValue(
      of({
        token: 'fake-token'
      })
    );

    component.loginForm.setValue({
      email: 'charles@test.com',
      password: 'Password123!'
    });

    component.logUser();

    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'charles@test.com',
      password: 'Password123!'
    });
  });

  it('should set session, show success notification and navigate on success', () => {
    const response = {
      token: 'fake-token'
    };

    authServiceMock.login.mockReturnValue(of(response));

    component.loginForm.setValue({
      email: 'charles@test.com',
      password: 'Password123!'
    });

    component.logUser();

    expect(sessionServiceMock.setUser).toHaveBeenCalledWith(response);
    expect(notificationServiceMock.success).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should show error notification on login failure', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => new Error('Authentication failed'))
    );

    component.loginForm.setValue({
      email: 'charles@test.com',
      password: 'WrongPassword'
    });

    component.logUser();

    expect(notificationServiceMock.error).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(sessionServiceMock.setUser).not.toHaveBeenCalled();
  });

});
