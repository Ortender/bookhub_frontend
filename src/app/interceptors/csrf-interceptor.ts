import { HttpInterceptorFn } from '@angular/common/http';

function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));

  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {

  const csrfToken = getCookie('XSRF-TOKEN');

  let clonedReq = req.clone({
    withCredentials: true
  });

  if (csrfToken && ['POST','PUT','PATCH','DELETE'].includes(req.method)) {
    clonedReq = clonedReq.clone({
      setHeaders: {
        'X-XSRF-TOKEN': csrfToken
      }
    });
  }

  return next(clonedReq);
};