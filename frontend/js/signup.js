//Validation for confirming password
let password = document.getElementById("password_input");
let confirm_password = document.getElementById("confirm_password_input");
let nameInput = document.getElementById("name_input");
let emailInput = document.getElementById("email_input");

let inputsValid = false;

/**
 * Function to validate the input fields.
 */
function validateInput() {
    // Validate the email input
    if (isValidEmail(emailInput.value) !== "Correct") {
        emailInput.setCustomValidity(isValidEmail(emailInput.value));
        inputsValid = false;
        return;
    }

    // Validate the name and email inputs
    if (!nameInput.value || !emailInput.value) {
        confirm_password.setCustomValidity("Please Enter Name AND Email");
        inputsValid = false;
        return;
    }

    // Validate the password input
    if (!password.value) {
        password.setCustomValidity("Please enter password");
        inputsValid = false;
        return;
    }
    if (!isStrongPassword(password.value)) {
        password.setCustomValidity("Your password is too weak. A strong password should have at least 8 characters, including uppercase letters, lowercase letters, digits, and special characters");
        inputsValid = false;
        return;
    }

    // Validate the confirm password input
    if (password.value !== confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
        inputsValid = false;
        return;
    }

    confirm_password.setCustomValidity('');
    inputsValid = true;
}

// Add event listeners to clear the custom validity when the input fields are modified
emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity('');
});
nameInput.addEventListener("input", () => {
    nameInput.setCustomValidity('');
});
password.addEventListener("input", () => {
    password.setCustomValidity('');
});
confirm_password.addEventListener("input", () => {
    confirm_password.setCustomValidity('');
});

// Get the element by its ID
const element = document.getElementById('drop_down');

// Add event listener for the select tag
element.addEventListener('change', function (event) {
    const selectedIndex = event.target.selectedIndex;

    // Check if the form already has a company input field
    let existingInput = document.getElementById('company_input');

    if (selectedIndex == 1) {
        if (!existingInput) {
            const input = document.querySelector('#company-input');
            input.style.display = "block";
        }
    } else {
        document.querySelector('#company-input').style.display = "none";
    }
});

const signUpBtn = document.getElementById("submit_button");

signUpBtn.addEventListener('click', async function (event) {
    // Validate the input fields
    validateInput();
    if (!inputsValid) {
        return;
    }

    // Prevent the default form submission
    event.preventDefault();

    // Get the form values
    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const password = CryptoJS.SHA256(document.getElementById("password_input").value).toString();
    const role = document.getElementById("drop_down").value;
    const company = document.getElementById("company-input")?.value;

    // Create the request body
    const body = {
        name: name,
        password: password,
        email: email,
        role: role,
        company: company
    };

    try {
        // Log the request body to the console
        console.log(body);

        // Make an asynchronous POST request to the "/register" endpoint
        const response = await axios.post("/register", body);

        // Log the response data to the console
        console.log(response.data);

        // Redirect the user to the "/login" page after a 500ms delay
        setTimeout(() => {
            window.location.href = "/login";
        }, 500);
    } catch (error) {
        // Log the error response data to the console
        console.log(error.response.data);
    }
});

/**
 * Function to check if a password is strong.
 * @param {string} password - The password to be checked.
 * @returns {boolean} - True if the password is strong, false otherwise.
 */
function isStrongPassword(password) {
    // Define the criteria for a strong password
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);

    // Check if all criteria are met
    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialChar
    );
}

/**
 * Function to validate an email address.
 * @param {string} email - The email address to be validated.
 * @returns {string} - "Correct" if the email is valid, an error message otherwise.
 */
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
        return "Please Enter Email";
    }
    if (!emailRegex.test(email)) {
        return "Invalid Email";
    }
    return "Correct";
}