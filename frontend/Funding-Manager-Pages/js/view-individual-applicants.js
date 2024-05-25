

// =======================

const applicantName = document.querySelector("#applicantName");
const contact = document.querySelector("#contact");
const fundType = document.querySelector("#fundType");
const email = document.querySelector("#email");
const reason = document.querySelector("#description");

const viewApplication = document.querySelector(".viewApplication");
const viewCV = document.querySelector(".viewCV");
const viewOther = document.querySelector(".viewOther");

const Accept = document.querySelector(".Accept");
const Reject = document.querySelector(".Reject");

const pdf = document.querySelector(".pdf");

let application_id;
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value)
    if (name === 'application_id') {
        application_id = value
    }
}

let application;
let fundingOpportunity;
const flow = async () => {
    try {
        const response = await axios.get(`api/v1/application?_id=${application_id}`)
        application = response.data[0];
        console.log("APPLICATION")
        console.log(application)
    } catch (error) {
        console.log(error)
        alert("Could not get application details")
        return;
    }

    let user;
    try {
        const response = await axios.get(`api/v1/applicant?email=${application.applicant_email}`)
        user = response.data[0];
        console.log("USER")
        console.log(user)
    } catch (error) {
        alert("Could not get applicant details")
        return;
    }

    try {
        console.log("funding opportunity ID")
        console.log(application.funding_opportunity_id)
        const response = await axios.get(`api/v1/funding-opportunity?_id=${application.funding_opportunity_id}`)
        fundingOpportunity = response.data[[0]];
        console.log("funding opportunity")
        console.log(fundingOpportunity)
    } catch (error) {
        alert("Could not get funding opportunity details")
        return;
    }
    document.querySelector(".funding-opportunity-title").textContent = fundingOpportunity.title;


    applicantName.value = user.name;
    contact.value = application.contact_number;
    fundType.value = fundingOpportunity.type;
    email.value = application.applicant_email;
    reason.value = application.reason;


}
flow();

Accept.addEventListener("click", async (event) => {

    if (application.status === "Accepted") {
        alert("Applicant already accepted!");
        return;
    }

    if (!confirm("Are you sure you want to ACCEPT this applicant?")) {
        return;
    }



    try {
        await axios.put(`api/v1/application/${application._id}`, {
            status: "Accepted"
        })
        await axios.put(`api/v1/funding-opportunity/${fundingOpportunity._id}`, {
            available_slots: fundingOpportunity.available_slots - 1
        })

        alert(`Applicant has been successfully accepted for the opportunity.`);
        location.reload();

    } catch (error) {
        console.log(error)
        alert("Sorry, could not accept application")
    }
})
Reject.addEventListener("click", async (event) => {

    if (application.status === "Rejected") {
        alert("Applicant already rejected!");
        return;
    }

    if (application.status === "Accepted") {
        if (!confirm("Are you sure you want to remove your acceptance of this applicant?")) {
            return
        }
        try {
            await axios.put(`api/v1/funding-opportunity/${fundingOpportunity._id}`, {
                available_slots: fundingOpportunity.available_slots + 1 //Undo the decrease
            })
        } catch (error) {
            alert("Sorry an error has occured. Please try again later")
            console.log(error)
        }


    }

    if (!confirm("Are you sure you want to REJECT this applicant?")) {
        return;
    }

    try {
        await axios.put(`api/v1/application/${application._id}`, {
            status: "Rejected"
        })
        alert(`Applicant has been successfully rejected for the opportunity.`);
        location.reload();


    } catch (error) {
        console.log(error)
        alert("Sorry, could not reject application")
    }
})

viewApplication.addEventListener("click", event => {
    if (!application.application_form_data) {
        alert("Applicant has not submitted that document")
        return
    }
    pdf.src = application.application_form_data
})
viewCV.addEventListener("click", event => {
    if (!application.cv_data) {
        alert("Applicant has not submitted that document")
        return
    }
    pdf.src = application.cv_data
})
viewOther.addEventListener("click", event => {
    if (!application.other_data) {
        alert("Applicant has not submitted that document")
        return
    }
    pdf.src = application.other_data
})