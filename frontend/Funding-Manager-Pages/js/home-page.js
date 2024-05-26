// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED")
    // Redirect the user to the home page when the logo is clicked
    window.location.href = "/home";
});