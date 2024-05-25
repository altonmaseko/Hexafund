const requestSection = document.querySelector(".requests");

/**
 * Asynchronous function to load funding opportunities.
 * @param {string} query_params - Optional query parameters to filter the funding opportunities.
 */
const loadOpportunities = async (query_params) => {
    // Clear the content of the request section
    requestSection.textContent = "";

    let response;
    try {
        // Make a GET request to the "/api/v1/funding-opportunities" endpoint with the given query parameters
        response = await axios.get("api/v1/funding-opportunities" + query_params);
    } catch (error) {
        // Display an alert if there was an error loading the funding opportunities
        alert("Sorry, couldn't load the funding opportunities");
        console.log(error.message);
        return;
    }

    const fundingOpportunities = response.data;

    // Check if there are any funding opportunities
    if (fundingOpportunities.length <= 0) {
        alert("There are currently no funding opportunities.");
        return;
    }

    // Loop through the funding opportunities and create a request card for each one
    fundingOpportunities.forEach((fundingOpportunity) => {
        let { _id, title, company_name, admin_status, type, deadline, description, funding_amount, available_slots, image_data } = fundingOpportunity;

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
                    <span id="adminStatus">${admin_status}</span>
                    <button class="delete-btn">Delete</button>
                </div>`;

        requestCard.innerHTML = requestCardInnerHTML;

        // Set the image source for the ad image
        let adImage = requestCard.querySelector(".ad-image");
        if (!image_data) {
            // Use a placeholder image if no image data is provided
            adImage.src = "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg";
        } else {
            adImage.src = image_data;
        }

        // Append the request card to the request section
        requestSection.appendChild(requestCard);

        // Add a click event listener to the delete button
        const deleteButton = requestCard.querySelector(".delete-btn");
        deleteButton.addEventListener("click", async (event) => {
            console.log("DELETE button clicked");

            try {
                // Make a DELETE request to the "/api/v1/funding-opportunity/:id" endpoint
                await axios.delete(`/api/v1/funding-opportunity/${_id}`);
                // Remove the request card from the DOM
                requestCard.remove();
            } catch (error) {
                console.log(error.message);
                alert("Sorry, could not approve this funding opportunity. Please try again later.");
            }
        });

        // Set the funding opportunity ID as an attribute on the delete button
        deleteButton.setAttribute("funding_opportunity_id", _id);
    });
};

// Get the category dropdown element
const categoryDropDown = document.querySelector("#category-dropdown");

// Add an event listener to the category dropdown
categoryDropDown.addEventListener("input", async (event) => {
    console.log(categoryDropDown.value);

    // If the selected value is "All Options", load all funding opportunities
    if (categoryDropDown.value === "All Options") {
        await loadOpportunities("");
        return;
    }

    // Otherwise, load funding opportunities based on the selected category
    const query_params = `?type=${categoryDropDown.value}`;
    await loadOpportunities(query_params);
});

// Load the initial set of funding opportunities when the page loads
loadOpportunities("");

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED")
    // Redirect the user to the "/home" page
    window.location.href = "/home";
});