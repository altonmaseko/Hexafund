// This event listener is attached to the "delete_acc_button" element
document.getElementById("delete_acc_button").addEventListener("click", async (event) => {
    // Prevent the default behavior of the button click
    event.preventDefault();

    // Display a confirmation dialog to the user
    if (!confirm("Are you sure you want to delete your Acount? This action is not reversable?")) {
        // If the user cancels, return from the function
        return
    }

    try {
        // Make an asynchronous DELETE request to the "/api/v1/delete" endpoint
        const response = await axios.delete("/api/v1/delete");

        // Log the response data to the console
        console.log(response.data);

        // Redirect the user to the "/login" page
        window.location.href = "/login";
    } catch (error) {
        // Log any errors that occur during the request
        console.log(error);
    }
});