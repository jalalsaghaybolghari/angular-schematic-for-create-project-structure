import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput, LoginResult, RegisterInput } from '../auth.model';
import { AppConfigService } from '../../../shared/services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  serverUrl: string;
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.serverUrl = this.appConfigService.getServerUrl();
  }


  login(loginInput: LoginInput) {
    return this.http.post<LoginResult>(
      `${this.serverUrl}/login`,
      loginInput
    );
  }
  register(registerInput: RegisterInput) {
    return this.http.post<null>(
      `${this.serverUrl}/register`,
      registerInput
    );
  }
  logout() {
    return this.http.post<unknown>(`${this.serverUrl}/logout`, null);
  }
}
