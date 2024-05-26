/**
 * Function to delete all cookies from the browser.
 */
function deleteAllCookies() {
    // Split the document.cookie string into an array of individual cookies
    const cookies = document.cookie.split(";");

    // Loop through each cookie and set its expiration date to the past to effectively delete it
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}

/**
 * Event listener for the "logout_button" element.
 * When clicked, it deletes all cookies and redirects the user to the "/login" page.
 */
document.getElementById("logout_button")?.addEventListener("click", async (event) => {
    // Prevent the default behavior of the button click
    event.preventDefault();

    try {
        // Delete all cookies
        deleteAllCookies();

        // Make an asynchronous GET request to the "/logout" endpoint
        const response = await axios.get("/logout");

        // Log the response data to the console
        console.log(response.data);

        // Redirect the user to the "/login" page
        window.location.href = "/login";
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
});

/**
 * Event listener for the "logo" element.
 * When clicked, it redirects the user to the "/home" page.
 */
document.getElementById("logo")?.addEventListener("click", event => {
    // Log a message to the console
    console.log("LOGO CLICKED");

    // Redirect the user to the "/home" page
    window.location.href = "/home";
});