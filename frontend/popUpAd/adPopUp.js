
const sendButton = document.querySelector(".sendButton");

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
    }
    else {
        alert("Ad has been submitted")
    }
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
    return
}

const title = document.querySelector("#fundTitle").value;
const company_name = document.querySelector("#companyName").value;
const type = document.querySelector("#category").value;
const funding_amount = document.querySelector("#amount").value;
const available_slots = document.querySelector("#count").value;
const deadline = document.querySelector("#expiryDate").value;
const description = document.querySelector("#description").textContent;
const funding_manager_email = userEmail



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

document.querySelector(".sendButton").addEventListener("click", () => {
    try {
        axios.post("/api/v1/funding-opportunity", {
            title,
            company_name,
            funding_manager_email,
            type,
            funding_amount,
            available_slots,
            deadline,
            description
        })
    } catch (error) {
        alert("Sorry. Could not store ads")
    }
})