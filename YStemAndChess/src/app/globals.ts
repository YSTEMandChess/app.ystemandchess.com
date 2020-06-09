import { CookieService } from 'ngx-cookie-service';

var information;

async function setPermissionLevel(cookie: CookieService) {
    let cookieName: string = "login";
    if (cookie.check(cookieName)) {
        let cookieContents: string = cookie.get(cookieName);
        let url = `http://localhost:8000/verify.php?jwt=${cookieContents}`;
        await fetch(url).then(response => response.json()).then(data => information=data);
        return information;
    } else {
        console.log("User not logged in.");
    }
    
}

export { setPermissionLevel, information};

// testUsername
// 123456789