import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       let modifiedRequest = req.clone({
        headers:req.headers.append('x-api-key','secrt-dev-1505')
       })
        return next.handle(modifiedRequest);
    }
}