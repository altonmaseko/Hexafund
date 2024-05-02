

function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // Setting an old date removes cooky
    }
}


document.getElementById("logout_button")?.addEventListener("click", async (event) => {

    event.preventDefault();
    try {
        deleteAllCookies()
        const response = await axios.get("/logout");
        console.log(response.data);
        window.location.href = "../login.html";
    } catch (error) {
        console.log(error);
    }
});