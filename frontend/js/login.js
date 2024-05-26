// This event listener is attached to the "submit_button" element
document.getElementById("submit_button").addEventListener("click", async (event) => {
    // Prevent the default behavior of the button click
    event.preventDefault();

    // Get the value of the email input field
    let email = document.getElementById("email_input").value;

    // Set the password value based on the email entered
    let password;
    if (email === "admin@gmail.com") { // This is for testing purposes
        password = document.getElementById("password_input").value;
    } else {
        // Hash the password using CryptoJS SHA256 algorithm
        password = CryptoJS.SHA256(document.getElementById("password_input").value).toString();
    }

    try {
        // Log the email and password to the console (for debugging purposes)
        console.log({ email, password });

        // Make an asynchronous POST request to the "/login" endpoint with the email and password
        const response = await axios.post("/login", { email, password });

        // Log the response data to the console
        console.log(response.data);

        // Get the access token from the response
        const accessToken = response.data.accessToken;

        // Set the Authorization header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Store the access token, email, and name in cookies
        document.cookie = `accessToken=${accessToken}; path=/`;
        document.cookie = `email=${email}; path=/`;
        document.cookie = `name=${response.data.name}; path=/`;

        // Redirect the user to the "/home" page
        window.location.href = "/home";
    } catch (error) {
        // Display an alert with the error message
        alert(error.response.data.message);

        // Log the error to the console
        console.log(error);
    }
});