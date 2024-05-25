//Validation for confirming password
let password = document.getElementById("password_input")
let confirm_password = document.getElementById("confirm_password_input");
let nameInput = document.getElementById("name_input")
let emailInput = document.getElementById("email_input")

let inputsValid = false;

function validateInput() {
    if (isValidEmail(emailInput.value) != "Correct") {
        emailInput.setCustomValidity(isValidEmail(emailInput.value));
        inputsValid = false;
        return
    }
    if (!nameInput.value || !emailInput.value) {
        confirm_password.setCustomValidity("Please Enter Name AND Email");
        inputsValid = false;
        return
    }
    if (!password.value) {
        password.setCustomValidity("Please enter password");
        inputsValid = false;
        return
    }
    if (!isStrongPassword(password.value)) {
        password.setCustomValidity("Your password is too weak. A strong password should have at least 8 characters, including uppercase letters, lowercase letters, digits, and special characters");
        inputsValid = false;
        return
    }
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
        inputsValid = false;
        return
    }


    confirm_password.setCustomValidity('');
    inputsValid = true;

}


emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity('');
})
nameInput.addEventListener("input", () => {
    nameInput.setCustomValidity('');
})
password.addEventListener("input", () => {
    password.setCustomValidity('');
})
confirm_password.addEventListener("input", () => {
    confirm_password.setCustomValidity('');
})

// Get the element by its ID
const element = document.getElementById('drop_down');

// Add event listener for the select tag
element.addEventListener('change', function (event) {
    const selectedIndex = event.target.selectedIndex;

    /* 
    * TODO:
    ** The 'company_input' field should always be there
    ** If the user selects 'Fund Manager', the 'company_input' field should then be usable
    ** If the user selects 'Applicant', the 'company_input' field should no longer be able to be interacted with
    ** The 'company_input' field should be a required field if the user selects 'Fund Manager'
    ** Add data validation

    * These changes make things a bit easier and a little more efficient
    */

    // Check if the form already has a company input field
    let existingInput = document.getElementById('company_input');

    if (selectedIndex == 1) {
        // If there's no company input field yet, create and append one
        if (!existingInput) {
            // const input = document.createElement('input');
            // input.type = 'text';
            // input.id = 'company_input';
            // input.name = 'Company_Name';
            // input.placeholder = 'Company name...';

            // //add class name
            // input.classList.add("sign-up-input");

            // const refElement = document.getElementById("drop_down_label");
            // const form = document.getElementById("login");
            // //TODO add padding or smth
            // form.insertBefore(input, refElement);

            const input = document.querySelector('#company-input');

            input.style.display = "block";

        }
    } else {
        // If the role changes away from fund manager, remove the company input field
        // if (existingInput) {
        //     existingInput.remove();
        // }
        document.querySelector('#company-input').style.display = "none";
    }
});


const signUpBtn = document.getElementById("submit_button")

signUpBtn.addEventListener('click', async function (event) {
    validateInput()
    if (!inputsValid) {
        return
    }
    event.preventDefault();

    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const password = CryptoJS.SHA256(document.getElementById("password_input").value).toString();
    const role = document.getElementById("drop_down").value;
    const company = document.getElementById("company-input")?.value;

    // TRYING AXIOS
    const body = {
        name: name,
        password: password,
        email: email,
        role: role,
        company: company
    }

    try {
        console.log(body);
        const response = await axios.post("/register", body);
        console.log(response.data);

        setTimeout(() => {
            window.location.href = "/login"
        }, 500);

    } catch (error) {
        console.log(error.response.data);
    }
    // END: TRYING AXIOS
});

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

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.includes("@")) {
        return "Email must contain an '@' symbol.";
    } else if (email.startsWith("@") || email.endsWith("@")) {
        return "The '@' symbol should not be the first or last character.";
    } else {
        return "Correct";
    }
}