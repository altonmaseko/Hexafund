axios.defaults.baseURL = 'https://funding-website.azurewebsites.net/'; // PRODUCTION URL
// axios.defaults.baseURL = 'http://localhost:3000/'; // LOCAL URL

document.getElementById("logout_button").addEventListener("click", async (event) => {

    event.preventDefault();

    try {
        const response = await axios.get("/logout");
        console.log(response.data);
        window.location.href = "../login.html";
    } catch (error) {
        console.log(error);
    }
});