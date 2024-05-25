// Get the check status button and the requests section element
const checkStatusButton = document.getElementById("checkStatusBtn");
const requestSection = document.querySelector(".requests");

// Function to load the funding opportunities
const loadOpportunities = async (query_params) => {
    // Clear the requests section
    requestSection.textContent = "";

    let response;
    try {
        // Fetch the funding opportunities from the API
        response = await axios.get("api/v1/funding-opportunities" + query_params);
    } catch (error) {
        alert("Sorry, couldn't load the funding opportunities");
        console.log(error.message);
        return;
    }
    const fundingOpportunities = response.data;

    // If there are no funding opportunities, display an alert
    if (fundingOpportunities.length <= 0) {
        alert("There are currently no funding opportunities :(");
        return;
    }

    // Loop through the funding opportunities and create a request card for each
    fundingOpportunities.forEach(async (fundingOpportunity) => {
        // Destructure the funding opportunity properties
        let { title, company_name, funding_manager_email, admin_status, type, _id, deadline, description, funding_amount, available_slots, image_data } = fundingOpportunity;

        // Format the deadline
        deadline = deadline.slice(0, deadline.indexOf("T")); // Just get the day, month, year and skip the time

        // Check if the user has already applied for the funding opportunity
        let response;
        let applications = [];
        let applyButtonMessage = "Apply";

        try {
            // Fetch the user's applications
            response = await axios.get(`api/v1/application?funding_opportunity_id=${_id}&applicant_email=${userEmail}`);
            applications = response.data;
            if (applications.length > 0) {
                applyButtonMessage = "Already Applied ✔";
            } else {
                applyButtonMessage = "Apply";
            }
        } catch (error) {
            // Handle the error
        }

        // Create the request card element
        const requestCard = document.createElement("div");
        requestCard.classList.add("request-card");
        const requestCardInnerHTML = `<div class="card-left">
                    <img class="ad-image" src="https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg?w=976&h=549" alt="Image">
                </div>
                <div class="card-right">
                    <h3>
                        <span id="title">${title}</span>
                        <span id="expDate">Expiry Date: ${deadline}</span>
                        <span id="compName">Company: ${company_name}</span>
                        <span id="category">Category: ${type}</span>
                    </h3>
                    <p id="amount">Amount: R${funding_amount} [${available_slots} available]</p>
                    <p id="description">Description: ${description} </p>
                    <button class="apply-btn">${applyButtonMessage}</button>
                </div>`;

        requestCard.innerHTML = requestCardInnerHTML;

        // Disable the apply button if the user has already applied
        if (applications.length > 0) {
            requestCard.querySelector(".apply-btn").disabled = true;
        }

        // Set the image source for the ad image
        let adImage = requestCard.querySelector(".ad-image");
        if (!image_data) {
            adImage.src = "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg";
        } else {
            adImage.src = image_data;
        }

        // Add the request card to the requests section
        requestSection.appendChild(requestCard);

        // Add a click event listener to the apply button
        const applyButton = requestCard.querySelector(".apply-btn");
        applyButton.setAttribute("funding_opportunity_id", _id);
        applyButton.addEventListener("click", async (event) => {
            // Set the funding opportunity ID in a cookie and redirect to the apply page
            document.cookie = `funding_opportunity_id=${applyButton.getAttribute("funding_opportunity_id")}; path=/`;
            window.location.href = "/apply";
        });
    });
};

// Add an input event listener to the category dropdown
const categoryDropDown = document.querySelector("#category-dropdown");
categoryDropDown.addEventListener("input", async (event) => {
    // Determine the query parameters based on the selected category
    if (categoryDropDown.value === "All Options") {
        const query_params = `?admin_status=Approved`;
        await loadOpportunities(query_params);
        return;
    }

    const query_params = `?admin_status=Approved&type=${categoryDropDown.value}`;
    await loadOpportunities(query_params);
});

// Load the initial set of funding opportunities
const query_params = `?admin_status=Approved`;
loadOpportunities(query_params);

// Get the user's name and email from cookies
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
let userName;
let userEmail;
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value);
    if (name === 'name') {
        userName = value;
    }
    if (name === 'email') {
        userEmail = value;
    }
}

// Set the welcome message
document.querySelector(".welcome-h2").textContent = `Welcome, ${userName} :)`;

// Function to get the user's applications
let applications;
let fundingOpportunities;
const getApplications = async () => {
    try {
        // Fetch the user's applications and the funding opportunities
        let response = await axios.get(`api/v1/applications?applicant_email=${userEmail}`);
        applications = response.data;
        response = await axios.get(`api/v1/funding-opportunities`);
        fundingOpportunities = response.data;
    } catch (error) {
        alert("Could not get your applications statuses, please try again later.");
        return;
    }
};
getApplications();

// Add a click event listener to the check status button
checkStatusButton.addEventListener("click", event => {
    // If the user has no applications, display an alert
    if (applications.length <= 0) {
        alert("You have no applications at the moment.");
        return;
    }

    // Create the status message
    let status = "Statuses for your applications: \n";

    // Loop through the user's applications and get the status for each
    applications.forEach(application => {
        let fundingOpportunity = fundingOpportunities.find(funding => {
            return funding._id == application.funding_opportunity_id;
        });
        fundingOpportunity = fundingOpportunity;
        status += fundingOpportunity.title + ": " + application.status + "  \n";
    });

    // Display the status message in an alert
    alert(status);
});

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED");
    // Redirect the user to the home page when the logo is clicked
    window.location.href = "/home";
});