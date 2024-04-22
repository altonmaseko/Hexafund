axios.defaults.baseURL = 'https://funding-website.azurewebsites.net/';
// axios.defaults.baseURL = 'http://localhost:3000/';

document.getElementById("submit_button").addEventListener("click", async(event)=>{

    event.preventDefault();
    let email = document.getElementById("email_input").value;
    let password = document.getElementById("password_input").value;

    try {
        console.log({email,password})
        const response = await axios.post("/login", {email, password})
        console.log(response.data)
        const accessToken = response.data.accessToken 

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        document.cookie = `accessToken=${accessToken}; path=/`;
        document.cookie = `email=${email}; path=/`;

        window.location.href = "/home";
    } catch (error) {
        console.log(error);
    }
});