axios.defaults.baseURL = 'https://funding-website.azurewebsites.net/'; // PRODUCTION URL
// axios.defaults.baseURL = 'http://localhost:3000/'; // LOCAL URL

// self-delete user
// TODO: add some sort of warning before deleting the account
// TODO: add some sort of confirmation before deleting the account
document.getElementById("delete_acc_button").addEventListener("click", async (event) => {
    
    event.preventDefault();
    
    try {
        const response = await axios.delete("/api/v1/delete");
        console.log(response.data);
        window.location.href = "../login.html";
    } catch (error) {
        console.log(error);
    }
});

/*
// TODO: implement admin-delete user
// admin-delete user
document.getElementById("delete_user_button").addEventListener("click", async (event) => {
    
});
*/