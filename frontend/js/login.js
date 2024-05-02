
document.getElementById("submit_button").addEventListener("click", async (event) => {

    event.preventDefault();
    let email = document.getElementById("email_input").value;

    let password
    if (email === "admin@gmail.com") //testing
    {
        password = document.getElementById("password_input").value
    } else {
        password = CryptoJS.SHA256(document.getElementById("password_input").value).toString();
    }

    try {
        console.log({ email, password });
        const response = await axios.post("/login", { email, password });
        console.log(response.data);
        const accessToken = response.data.accessToken;

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        document.cookie = `accessToken=${accessToken}; path=/`;
        document.cookie = `email=${email}; path=/`;
        document.cookie = `name=${response.data.name}; path=/`;

        window.location.href = "/home";
    } catch (error) {
        console.log(error);
    }
});