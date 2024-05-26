// Get the submit button, view file button, and file input elements
const submitButton = document.getElementById('submitButton');
const viewFile = document.getElementById('viewFile');
const fileUpload = document.getElementById('fileInput');

// Get the PDF iframe element
const pdfIframe = document.getElementById("pdfIframe");

// Variable to store the base64 encoded file
let base64;

// Add a click event listener to the submit button
submitButton.addEventListener('click', async () => {
    // Get the selected file from the file input
    const selectedFile = fileUpload.files[0];

    // Check if a file is selected and if it's a PDF file
    if (!selectedFile || selectedFile.type !== 'application/pdf') {
        alert('Please select a PDF file!');
        return;
    }

    // Create a FileReader object to read the file
    var fileReader = new FileReader();

    // Convert the file to base64 encoding
    fileReader.readAsDataURL(selectedFile);

    // Handle the file read event
    fileReader.onload = function (fileLoadedEvent) {
        // Store the base64 encoded file
        base64 = fileLoadedEvent.target.result;

        console.log(base64);
        // Set the src attribute of the PDF iframe to the base64 encoded file
        pdfIframe.setAttribute("src", base64);

        // Create the application object
        const application = {
            applicant_email: "example@gmail.com",
            reason: "reason",
            contact_number: "0123456789",
            cv_data: base64
        };

        try {
            // Send a POST request to the API to create a new application
            axios.post("api/v1/application", application);
        } catch (error) {
            alert("Sorry, could not upload the file");
        }
    };
});

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED");
    // Redirect the user to the home page when the logo is clicked
    window.location.href = "/home";
});