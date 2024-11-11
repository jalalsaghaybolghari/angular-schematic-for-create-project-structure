import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginResult } from '../auth.model';
import { AuthCommonService } from '../services';
import { AppConfigService } from '../../../shared/services/app-config.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authCommonService = inject(AuthCommonService);
  const appConfigService = inject(AppConfigService);

  const serverUrl = appConfigService.getServerUrl();
  const loginResult = authCommonService.getLoginResult() as LoginResult;
  const nonAuthUrls = [`${serverUrl}/register`, `${serverUrl}/login`];

  if (!nonAuthUrls.includes(req.url)) {
    let reqWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${loginResult.token}`
      }
    });
    return next(reqWithToken);
  }
  return next(req);
};
