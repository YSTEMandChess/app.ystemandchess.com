import { environment } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';

var information;

async function setPermissionLevel(cookie: CookieService) {
  let cookieName: string = 'login';
  if (cookie.check(cookieName)) {
    var rawData;
    let cookieContents: string = cookie.get(cookieName);
    let url = `${environment.urls.middlewareURL}/auth/validate`;
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${cookieContents}`);
    await fetch(url, { method: 'POST', headers: headers })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        rawData = data;
      });
    if (
      rawData.includes('Unauthorized') ||
      rawData.includes('Error 405: User authentication is not valid or expired')
    ) {
      cookie.delete(cookieName);
      return {
        error: 'Error 405: User authentication is not valid or expired',
      };
    } else {
      information = JSON.parse(atob(cookieContents.split('.')[1]));
      return information;
    }
  } else {
    return { error: 'User is not logged in' };
  }
}

export { setPermissionLevel, information };

// testUsername
// 123456789
