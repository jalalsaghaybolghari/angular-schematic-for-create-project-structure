import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResult } from '../auth.model';
import { LocalStorageService } from '../../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthCommonService {
  private loginResultSubject: BehaviorSubject<LoginResult | null> = new BehaviorSubject<LoginResult| null>(null);
  public loginResult$: Observable<LoginResult| null> = this.loginResultSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const loginResult = this.localStorageService.getItem('loginResult');
    if (loginResult) this.setLoginResult(loginResult);
  }

  getLoginResult() : LoginResult | null {
    const value = localStorage.getItem('loginResult');
    return value ? JSON.parse(value) : null;
  }
  setLoginResult(value: LoginResult) {
      this.loginResultSubject.next(value);
      this.localStorageService.setItem('loginResult', value);
    
  }
  removeLoginResult() {
      this.loginResultSubject.next(null);
      this.localStorageService.removeItem('loginResult');
    
  }
}
