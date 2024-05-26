/**
 * Event listener for the ".deleteProfile" class elements.
 * When clicked, it deletes the user's account.
 */
document.querySelector(".deleteProfile").addEventListener("click", async () => {
    // Display a confirmation dialog to the user
    if (!confirm("Are you sure you want to delete your Acount? This action is not reversable?")) {
        // If the user cancels, return from the function
        return;
    }

    try {
        // Log a message to the console
        console.log("delete request");

        // Make an asynchronous DELETE request to the "/api/v1/delete" endpoint
        await axios.delete("/api/v1/delete");

        // Display an alert message to the user
        alert("Account Deleted Successfully");

        // Redirect the user to the home page
        window.location.href = "/";
    } catch (error) {
        // Display an alert message to the user
        alert("Sorry, couldn't delete your account. We promise this isn't intentional :) Please try again later!");

        // Redirect the user to the home page
        window.location.href = "/";
    }

    // Redirect the user to the home page
    window.location.href = "/";
});