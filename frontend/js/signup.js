// Get the element by its ID
const element = document.getElementById('drop_down');

// axios.defaults.baseURL = "https://funding-website.azurewebsites.net/" // PRODUCTION URL
axios.defaults.baseURL = "http://localhost:3000/" // LOCAL URL

// Add event listener for the select tag
element.addEventListener('change', function (event) {
    const selectedIndex = event.target.selectedIndex;

    /* 
    * TODO:
    ** The 'company_input' field should always be there
    ** If the user selects 'Fund Manager', the 'company_input' field should then be usable
    ** If the user selects 'Applicant', the 'company_input' field should no longer be able to be interacted with
    ** The 'company_input' field should be a required field if the user selects 'Fund Manager'

    * These changes make things a bit easier and a little more efficient
    */

    // Check if the form already has a company input field
    let existingInput = document.getElementById('company_input');

    if (selectedIndex == 1) {
        // If there's no company input field yet, create and append one
        if (!existingInput) {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'company_input';
            input.name = 'Company_Name';
            input.placeholder = 'Company name...';

            const refElement = document.getElementById("drop_down_label");
            const form = document.getElementById("login");
            //TODO add padding or smth
            form.insertBefore(input, refElement);
        }
    } else {
        // If the role changes away from fund manager, remove the company input field
        if (existingInput) {
            existingInput.remove();
        }
    }
});


const signUpBtn = document.getElementById("submit_button")

signUpBtn.addEventListener('click', async function (event) {
    event.preventDefault();

    const name = document.getElementById("name_input").value;
    const email = document.getElementById("email_input").value;
    const password = CryptoJS.SHA256(document.getElementById("password_input").value).toString();
    const role = document.getElementById("drop_down").value;
    const company = document.getElementById("company_input")?.value;

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
            window.location.href = "../login.html"
        }, 500);

    } catch (error) {
        console.log(error.response.data);
    }
    // END: TRYING AXIOS
});