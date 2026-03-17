import { TestBed } from '@angular/core/testing';

import { SessionService } from './session-service';

import { ResponseLogin } from '../interfaces/authentication/response-login';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the session after login', () => {
    const response: ResponseLogin = {
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJjaGFybGVzIiwicm9sZSI6W3siYXV0aG9yaXR5IjoiUk9MRV9SRUFERVIifV0sInN1YiI6ImphbWVzQGVtYWlsLmNvbSIsImlhdCI6MTc3Mzc1MzM3NywiZXhwIjoxNzczODM5Nzc3fQ.DgeyEYFo5s8kuGJaP5F3_8FWrTbGnD2BmJFGxn-GR4U'
    };

    service.setUser(response);

    expect(service.isLoggedIn()).toBeTruthy;
    expect(service.currentUser()?.token).toBe('eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJjaGFybGVzIiwicm9sZSI6W3siYXV0aG9yaXR5IjoiUk9MRV9SRUFERVIifV0sInN1YiI6ImphbWVzQGVtYWlsLmNvbSIsImlhdCI6MTc3Mzc1MzM3NywiZXhwIjoxNzczODM5Nzc3fQ.DgeyEYFo5s8kuGJaP5F3_8FWrTbGnD2BmJFGxn-GR4U');
    expect(service.currentUser()?.firstName).toBe('charles');
    expect(service.currentUser()?.roles).toEqual([{authority:'ROLE_READER'}]);
  });

  it('should clear the session on logout', () => {
    const response: ResponseLogin = {
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJjaGFybGVzIiwicm9sZSI6W3siYXV0aG9yaXR5IjoiUk9MRV9SRUFERVIifV0sInN1YiI6ImphbWVzQGVtYWlsLmNvbSIsImlhdCI6MTc3Mzc1MzM3NywiZXhwIjoxNzczODM5Nzc3fQ.DgeyEYFo5s8kuGJaP5F3_8FWrTbGnD2BmJFGxn-GR4U'
    };

    service.setUser(response);
    service.logout();

    expect(service.isLoggedIn()).toBeFalsy;
    expect(service.currentUser()?.token).toBeNull;
    expect(service.currentUser()?.firstName).toBeNull;
    expect(service.currentUser()?.roles).toBeNull;

  })

});
