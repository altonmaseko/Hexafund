

// self-delete user
// TODO: add some sort of warning before deleting the account
// TODO: add some sort of confirmation before deleting the account
document.getElementById("delete_acc_button").addEventListener("click", async (event) => {

    event.preventDefault();

    if (!confirm("Are you sure you want to delete your Acount? This action is not reversable?")) {
        return
    }
    try {
        const response = await axios.delete("/api/v1/delete");
        console.log(response.data);
        window.location.href = "/login";
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