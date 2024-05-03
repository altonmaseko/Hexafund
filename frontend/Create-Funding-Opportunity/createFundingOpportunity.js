
const sendButton = document.querySelector(".sendButton");

let inputsValid = false

sendButton.addEventListener("click", function () {
    const fundTitle = document.getElementById("fundTitle").value;
    const companyName = document.getElementById("companyName").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const count = document.getElementById("count").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const description = document.getElementById("description").value;

    if (!fundTitle || !companyName || category === "" || !amount || !count || !expiryDate || !description) {
        alert("Please fill in all fields.");
        return
    }

    inputsValid = true

});

let userEmail
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value)
    if (name === 'email') {
        userEmail = value
    }
}

if (!userEmail) {
    alert("System has lost your details. This page will not work, sorry")
}



const obj =
{
    "title": "Women in Tech Scholarship",
    "company_name": "TechWomen",
    "funding_manager_email": "scholarship@techwomen.org",
    "type": "Educational",
    "funding_amount": 7500,
    "available_slots": 7,
    "deadline": "2024-06-15",
    "description": "Supporting women pursuing tech careers."
}

document.querySelector(".sendButton").addEventListener("click", async () => {

    if (!inputsValid)
    {
        return
    }
    // GET DATA
    const title = document.querySelector("#fundTitle").value;
    const company_name = document.querySelector("#companyName").value;
    const type = document.querySelector("#category").value;
    const funding_amount = document.querySelector("#amount").value;
    const available_slots = document.querySelector("#count").value;
    const description = document.querySelector("#description").textContent;
    const funding_manager_email = userEmail
    let deadline = document.getElementById("expiryDate").value
    deadline = new Date(deadline)
    // =======

    console.log("Send Button Clicked")
    let response
    try {
        response = await axios.post("/api/v1/funding-opportunity", {
            title,
            company_name,
            funding_manager_email,
            type,
            funding_amount,
            available_slots,
            deadline,
            description
        })
        console.log(response.data)
        alert(`CONGRATS! ${title} was created successfully`)
        clearForm()
    } catch (error) {
        const data = error.response
        console.log(data)
        if (data.status === 409) {
            alert(`Sorry, ${title} already exists`)
        } else {
            alert(`Sorry, Could not submit ${title}`)
        }
        // window.location.href = "/"
    }
})

const clearForm = () => {
    document.querySelector("#fundTitle").value = "";
    document.querySelector("#companyName").value = "";
    document.querySelector("#category").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#count").value = "";
    document.querySelector("#description").textContent = "";
    document.getElementById("expiryDate").value = ""
}