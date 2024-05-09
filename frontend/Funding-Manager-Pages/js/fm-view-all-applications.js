
const container = document.querySelector(".container")
const pdfIframe = document.querySelector("#pdfIframe");

let userEmail;
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value)
    if (name === 'email') {
        userEmail = value
    }
}


const flow = async () => {
    container.textContent = "" // Clear it

    // Get all funding opportunities the funding manager owns
    let response
    let query_params = `?funding_manager_email=${userEmail}`;
    console.log("EMAIL");
    console.log(userEmail);
    try {
        response = await axios.get("api/v1/funding-opportunities" + query_params)
    } catch (error) {
        alert("Sorry, couldnt load the funding opportunities")
        console.log(error.message)
        return
    }
    const fundingOpportunities = response.data
    console.log("FUNDING OPPORTUNITIES:")
    console.log(fundingOpportunities)


    // GET ALL APPLICATIONS
    try {
        response = await axios.get("api/v1/applications");
    } catch (error) {
        alert("COULD NOT GET APPLICATIONS")
        return
    }
    const allApplications = response.data;
    let applications = [];

    fundingOpportunities.forEach(fundingOpportunity => {
        allApplications.forEach(application => {
            if (fundingOpportunity._id === application.funding_opportunity_id) {
                applications.push(application);
            }
        })
    })

    console.log("APPLICATIONS")
    console.log(applications)

    if (applications.length <= 0) {
        alert("You have not yet recieved applications.")
        return
    }

    // Display the applications
    applications.forEach((application) => {
        let {
            applicant_email,
            status,
            contact_number,
            reason,
            cv_data,
            application_form_data
        } = application;

        const columnInnerHTML = `<section class="applicant-info">
            <img src="https://thumbs.dreamstime.com/b/education-study-books-high-school-university-16383080.jpg" alt="Applicant 1">
            <section>
                <p>Email: ${applicant_email}</p>
                <p>Reason: ${reason}</p>
            </section>
        </section>
        <button class="btn-view">
            <a href="view-individual-applications.html">View Full Application</a>
        </button>`;

        const columnSection = document.createElement("section");
        columnSection.classList.add("column")
        columnSection.innerHTML = columnInnerHTML;

        container.appendChild(columnSection);

        // CV, APPLICATION FORM AND OTHER BUTTONS
        const cvButton = columnSection.querySelector(".cv-button");
        const applicationFormButton = columnSection.querySelector(".application-form-button");
        const otherButton = columnSection.querySelector(".other-button");

        // cvButton.addEventListener("click", (event) => {
        //     pdfIframe.src = cv_data
        // })
        // applicationFormButton.addEventListener("click", (event) => {
        //     pdfIframe.src = application_form_data
        // })
        // otherButton.addEventListener("click", (event) => {

        // })

    }) // END: applications.forEach



} // END: FLOW
flow();




