import { environment } from './../environments/environment';
import { CookieService } from 'ngx-cookie-service';

var information;

async function setPermissionLevel(cookie: CookieService) {
    let cookieName: string = "login";
    if (cookie.check(cookieName)) {
        var rawData;
        let cookieContents: string = cookie.get(cookieName);
        let url = `${environment.urls.middlewareURL}/verify.php?jwt=${cookieContents}`;
        await fetch(url).then(response => response.text()).then(data => rawData = data.toString());
        if(rawData.includes("Error: 405. This key has been tampered with or is out of date.")) {
            cookie.delete(cookieName);
            return {"error": "Error: 405: User authentication is not valid or expired"};
        }  else {
            information = JSON.parse(rawData);
            return information;
        }
    } else {
        console.log("User not logged in.");
        return {"error": "User is not logged in"}
    }
}

export { setPermissionLevel, information};

// testUsername
// 123456789