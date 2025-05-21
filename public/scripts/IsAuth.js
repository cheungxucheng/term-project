
function decodeJWT(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

document.addEventListener("DOMContentLoaded", function () 
{
    const token = localStorage.getItem("authToken");
    console.log("token: ", token);

    if (token) 
    {
        const welcomeEl = document.getElementById("welcome");
        const navLinks = document.querySelectorAll("#auth-link");

        try 
        {
            const user = decodeJWT(token);
            if (user && user.dbres2 && user.dbres2.firstname) 
            {
                if (welcomeEl)
                    welcomeEl.textContent = `Welcome back, ${user.dbres2.firstname}!`;
                navLinks.forEach((nav) => 
                {
                    nav.textContent = "My Profile";
                    nav.href = "/profile";
                });
            }
        } 
        catch (err) 
        {
            console.error("Failed to decode JWT:", err);
        }
    }        
});