// Get the container and PDF iframe elements
const container = document.querySelector(".container");
const pdfIframe = document.querySelector("#pdfIframe");

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

/**
 * Asynchronous function to display the funding opportunity applications.
 */
const flow = async () => {
    // Clear the container
    container.textContent = "";

    // Get all funding opportunities the funding manager owns
    let response;
    let query_params = `?funding_manager_email=${userEmail}`;
    console.log("EMAIL");
    console.log(userEmail);
    try {
        response = await axios.get("api/v1/funding-opportunities" + query_params);
    } catch (error) {
        alert("Sorry, couldn't load the funding opportunities");
        console.log(error.message);
        return;
    }
    const fundingOpportunities = response.data;
    console.log("FUNDING OPPORTUNITIES:");
    console.log(fundingOpportunities);

    // Get all applications
    try {
        response = await axios.get("api/v1/applications");
    } catch (error) {
        alert("COULD NOT GET APPLICATIONS");
        return;
    }
    const allApplications = response.data;
    let applications = [];

    // Filter the applications by the funding opportunities
    fundingOpportunities.forEach(fundingOpportunity => {
        allApplications.forEach(application => {
            if (fundingOpportunity._id === application.funding_opportunity_id) {
                applications.push(application);
            }
        });
    });

    console.log("APPLICATIONS");
    console.log(applications);

    // Check if there are any applications
    if (applications.length <= 0) {
        alert("You have not yet received applications.");
        return;
    }

    // Display the applications
    applications.forEach(async (application) => {
        let {
            _id,
            applicant_email,
            status,
            reason,
            funding_opportunity_id
        } = application;

        // Get the funding opportunity details
        let response = await axios.get("api/v1/funding-opportunity?_id=" + funding_opportunity_id);
        const fundingOpportunity = response.data[0];

        // Create the HTML for the application card
        const columnInnerHTML = `<section class="applicant-info">
            <img src="https://thumbs.dreamstime.com/b/education-study-books-high-school-university-16383080.jpg" alt="Applicant 1">
            <section>
                <p>Email: ${applicant_email}</p>
                <p>Status: ${status}</p>
                <p>Applied For: ${fundingOpportunity.title}</p>
                <p>Reason: ${reason}</p>
            </section>
        </section>
        <button class="btn-view">
            View Full Application
        </button>`;

        // Create a new column section and append it to the container
        const columnSection = document.createElement("section");
        columnSection.classList.add("column");
        columnSection.innerHTML = columnInnerHTML;
        container.appendChild(columnSection);

        // Add a click event listener to the "View Full Application" button
        const btnView = columnSection.querySelector(".btn-view");
        btnView.addEventListener("click", (event) => {
            // Set a cookie with the application ID and redirect to the applicant application page
            document.cookie = `application_id=${_id}; path=/`;
            window.location.href = "/applicant-application";
        });
    }); // END: applications.forEach
};

// Call the flow function to display the applications
flow();

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED");
    // Redirect the user to the home page when the logo is clicked
    window.location.href = "/home";
});