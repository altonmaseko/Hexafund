// Get the request section element
const requestSection = document.querySelector(".requests");

/**
 * Asynchronous function to load the funding opportunities.
 * @param {string} query_params - The query parameters to filter the funding opportunities.
 */
const loadOpportunities = async (query_params) => {
    // Clear the request section
    requestSection.textContent = "";

    let response;
    try {
        // Fetch the funding opportunities from the API with the given query parameters
        response = await axios.get("api/v1/funding-opportunities" + query_params);
    } catch (error) {
        // Display an alert and log the error message if there's an issue fetching the data
        alert("Sorry, couldn't load the funding opportunities");
        console.log(error.message);
        return;
    }
    const fundingOpportunities = response.data;

    // Check if there are any funding opportunities
    if (fundingOpportunities.length <= 0) {
        alert("You have no funding opportunities here :(");
        return;
    }

    // Loop through the funding opportunities and create a request card for each one
    fundingOpportunities.forEach((fundingOpportunity) => {
        let { title,
            company_name,
            admin_status,
            type,
            deadline,
            description,
            funding_amount,
            available_slots, image_data } = fundingOpportunity;

        // Extract the date part from the deadline
        deadline = deadline.slice(0, deadline.indexOf("T"));

        // Create a new request card element
        const requestCard = document.createElement("div");
        requestCard.classList.add("request-card");

        // Set the HTML content of the request card
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
                    <div class="status">
                        <div class="status-indicator"></div>
                        <span class="status-label">${admin_status}</span>
                    </div>
                </div>`;

        requestCard.innerHTML = requestCardInnerHTML;

        // Set the image source for the ad image
        let adImage = requestCard.querySelector(".ad-image");
        if (!image_data) {
            adImage.src = "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg";
        } else {
            adImage.src = image_data;
        }

        // Add the appropriate status class to the status indicator
        if (admin_status === "Approved") {
            requestCard.querySelector(".status-indicator").classList.add("approved");
        } else if (admin_status === "Rejected") {
            requestCard.querySelector(".status-indicator").classList.add("denied");
        } else if (admin_status === "Pending") {
            requestCard.querySelector(".status-indicator").classList.add("pending");
        }

        // Append the request card to the request section
        requestSection.appendChild(requestCard);
    }); // END: forEach
};

let userEmail;

// Get the category dropdown element
const categoryDropDown = document.querySelector("#category-dropdown");

// Add an event listener to the category dropdown
categoryDropDown.addEventListener("input", async (event) => {
    console.log(categoryDropDown.value);

    // Check if the selected option is "All Options"
    if (categoryDropDown.value === "All Options") {
        // Load the funding opportunities with the user's email as the query parameter
        const query_params = `?funding_manager_email=${userEmail}`;
        await loadOpportunities(query_params);
        return;
    }

    // Load the funding opportunities with the user's email and the selected category as query parameters
    const query_params = `?funding_manager_email=${userEmail}&type=${categoryDropDown.value}`;
    await loadOpportunities(query_params);
});

// Extract the user's email from the cookies
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value);
    if (name === 'email') {
        userEmail = value;
    }
}

// Check if the user's email was found in the cookies
if (!userEmail) {
    alert("System has lost your details. This page will not work, sorry");
}

// Load the funding opportunities with the user's email as the query parameter when the page loads
const query_params = `?funding_manager_email=${userEmail}`;
loadOpportunities(query_params);

/**
 * Asynchronous function to generate a CSV file containing funding opportunities.
 * @returns {string} The CSV data.
 */
const generateCSV = async () => {
    let response;

    try {
        // Fetch the funding opportunities from the API
        response = await axios.get("api/v1/funding-opportunities");
    } catch (error) {
        console.log(error.message);
        return;
    }

    const fundingOpportunities = response.data;
    let csvData = [];

    // Loop through the funding opportunities and create a CSV-friendly object for each one
    fundingOpportunities.forEach((fundingOpportunity) => {
        let { deadline } = fundingOpportunity;
        // Extract the date part from the deadline
        deadline = deadline.slice(0, deadline.indexOf("T"));

        const funding_opp_obj = {
            title: fundingOpportunity.title,
            company_name: fundingOpportunity.company_name,
            funding_manager_email: fundingOpportunity.funding_manager_email,
            admin_status: fundingOpportunity.admin_status,
            fund_type: fundingOpportunity.type,
            deadline: deadline,
            avail_amount: fundingOpportunity.funding_amount,
            avail_slots: fundingOpportunity.available_slots
        };

        csvData.push(funding_opp_obj);
    });

    // Convert the JavaScript object to a CSV string
    const csv = json2csv.parse(csvData, {
        delimiter: ',',
        eol: "\n"
    });

    return csv;
}

// Get the download CSV button element
const downloadCSVButton = document.getElementById("fundDetails");

/**
 * Function to download the CSV file.
 * @param {string} filename - The name of the CSV file.
 * @param {string} csv - The CSV data.
 */
const download = (filename, csv) => {
    // Add end-of-line character after each row
    csv = csv.replace(/,\n/g, ',\r\n');

    // Create a temporary anchor element to trigger the file download
    const element = document.createElement("a");

    // Set the href and download attributes of the anchor element
    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    element.setAttribute("download", filename);

    // Hide the anchor element
    element.style.display = "none";

    // Add the anchor element to the document, click it, and then remove it
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Add a click event listener to the download CSV button
downloadCSVButton.addEventListener("click", async () => {
    try {
        // Generate the CSV data
        const csv = await generateCSV();
        // Download the CSV file
        download("funding_opportunities.csv", csv);
    } catch (error) {
        console.log(error.message);
    }
});

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED")
    // Redirect the user to the home page when the logo is clicked
    window.location.href = "/home";
});