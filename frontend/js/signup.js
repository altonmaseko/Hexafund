// Get the element by its ID
const element = document.getElementById('drop_down');

axios.defaults.baseURL = "https://funding-website.azurewebsites.net/"


// Add event listener for the select tag
element.addEventListener('change', function (event) {
    const selectedIndex = event.target.selectedIndex;

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

            const refElement = document.getElementById("drop_down_label")
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
    event.preventDefault()


    const selectedIndex = document.getElementById('drop_down').selectedIndex
    const endpoint = "https://funding-website.azurewebsites.net/register"
    //TODO get name element
    const name = "test"
    const email = document.getElementById("email_input").value
    const password = document.getElementById("password_input").value
    const role = document.getElementById("drop_down").value
    const company = document.getElementById("company_input")?.value

    // TRYING AXIOS
    const body = {
        name: name,
        password: password,
        email: email,
        role,
        company
    }

    try {
        console.log(body)
        const response = await axios.post("/register", body)
        console.log(response.data)

        setTimeout(() => {
        window.location.href = "../login_page.html"
        }, 5000);

    } catch (error) {
        console.log(error.response)
    }


    // END: TRYING AXIOS

    // body

    // console.log("l")
    // if (selectedIndex==0){
    //     body = {
    //         name: name,
    //         password: password,
    //         email: email
    //     }   

    //     fetch(endpoint,{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: body
    //     }).then(response => response.json())
    //     .then(data=>{
    //         console.log("Response data:", data);
    //     })

    // }

});