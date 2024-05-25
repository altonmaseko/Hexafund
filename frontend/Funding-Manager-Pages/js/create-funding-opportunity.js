// Get the send button element
const sendButton = document.querySelector(".sendButton");

// Flags to keep track of input validity and base64 image data
let inputsValid = false;
let base64;

// Add a click event listener to the send button
sendButton.addEventListener("click", function () {
    // Get the values of the input fields
    const fundTitle = document.getElementById("fundTitle").value;
    const companyName = document.getElementById("companyName").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const count = document.getElementById("count").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const description = document.getElementById("description").value;

    // Check if all fields are filled in
    if (!fundTitle || !companyName || category === "" || !amount || !count || !expiryDate || !description) {
        alert("Please fill in all fields.");
        return;
    }

    // Set the inputsValid flag to true
    inputsValid = true;
});

// Get the user's email from the cookies
let userEmail;
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value);
    if (name === 'email') {
        userEmail = value;
    }
}

// Check if the user's email was found in the cookies
if (!userEmail) {
    alert("System has lost your details. This page will not work, sorry");
}

// Example funding opportunity object
const obj = {
    "title": "Women in Tech Scholarship",
    "company_name": "TechWomen",
    "funding_manager_email": "scholarship@techwomen.org",
    "type": "Educational",
    "funding_amount": 7500,
    "available_slots": 7,
    "deadline": "2024-06-15",
    "description": "Supporting women pursuing tech careers."
};

// Add a click event listener to the send button
document.querySelector(".sendButton").addEventListener("click", async () => {
    // Check if the inputs are valid
    if (!inputsValid) {
        return;
    }

    // Get the values of the input fields
    const title = document.querySelector("#fundTitle").value;
    const company_name = document.querySelector("#companyName").value;
    const type = document.querySelector("#category").value;
    const funding_amount = document.querySelector("#amount").value;
    const available_slots = document.querySelector("#count").value;
    const description = document.querySelector("#description").value;
    const funding_manager_email = userEmail;
    let deadline = document.getElementById("expiryDate").value;
    deadline = new Date(deadline);

    console.log("Send Button Clicked");

    let response;
    try {
        // Send a POST request to the API to create a new funding opportunity
        response = await axios.post("/api/v1/funding-opportunity", {
            title,
            company_name,
            funding_manager_email,
            type,
            funding_amount,
            available_slots,
            deadline,
            description,
            image_data: base64
        });
        console.log(response.data);
        alert(`CONGRATS! ${title} was created successfully`);
        clearForm();
    } catch (error) {
        const data = error.response;
        console.log(data);
        if (data.status === 409) {
            alert(`Sorry, ${title} already exists`);
        } else {
            alert(`Sorry, Could not submit ${title}`);
        }
    }
});

// Function to clear the form
const clearForm = () => {
    document.querySelector("#fundTitle").value = "";
    document.querySelector("#companyName").value = "";
    document.querySelector("#category").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#count").value = "";
    document.querySelector("#description").value = "";
    document.getElementById("expiryDate").value = "";
};

// Function to handle the file input for the image
let input = document.getElementById('picture');
input.addEventListener('change', handleFiles, false);

function handleFiles(e) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = new Image();

    img.onload = function () {
        // Set the canvas dimensions to the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a Base64 string
        base64 = canvas.toDataURL();
        console.log(base64);

        // Display the image
        let output = document.getElementById('output');
        output.src = base64;
    };

    // Load the selected image
    img.src = URL.createObjectURL(e.target.files[0]);
}

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED");
    // Redirect the user to the home page when the logo is clicked
    window.location.href = "/home";
});