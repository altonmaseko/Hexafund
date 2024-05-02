
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