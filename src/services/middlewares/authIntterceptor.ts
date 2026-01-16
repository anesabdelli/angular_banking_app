import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
HttpHandlerFn) => {
   const userToken = localStorage.getItem('jwt');
   const modifiedReq = req.clone({
     headers: req.headers.set('Authorization', `Bearer ${userToken}`),
   });
   return next(modifiedReq);
};


