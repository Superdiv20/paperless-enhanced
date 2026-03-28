import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const credentials = btoa(`${environment.authUser}:${environment.authPassword}`);
  const authReq = req.clone({
    setHeaders: { Authorization: `Basic ${credentials}` },
  });
  return next(authReq);
};
