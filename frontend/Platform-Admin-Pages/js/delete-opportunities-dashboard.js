const requestSection = document.querySelector(".requests");

const loadOpportunities = async (query_params) => {
    requestSection.textContent = "";
    let response;
    try {
        response = await axios.get("api/v1/funding-opportunities" + query_params);
    } catch (error) {
        alert("Sorry, couldnt load the funding opportunities");
        console.log(error.message);
        return;
    }
    const fundingOpportunities = response.data;

    if (fundingOpportunities.length <= 0) {
        alert("There are currently no funding opportunities.");
        return;
    }

    fundingOpportunities.forEach((fundingOpportunity) => {
        let { _id, title,
            company_name,
            admin_status,
            type,
            deadline,
            description,
            funding_amount,
            available_slots, image_data } = fundingOpportunity;

        deadline = deadline.slice(0, deadline.indexOf("T")); // Just get the day, month, year and skip the time

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
                    <span id="adminStatus">${admin_status}</span>
                    <button class="delete-btn">Delete</button>
                </div>`;

        requestCard.innerHTML = requestCardInnerHTML;

        let adImage = requestCard.querySelector(".ad-image");
        if (!image_data) {
            //TODO: Change the placeholder image
            adImage.src = "https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg?w=976&h=549"; // Placeholder image
        } else {
            adImage.src = image_data;
        }

        requestSection.appendChild(requestCard);


        // DELETE FOR CURRENT BUTTON [still in forEach]
        const deleteButton = requestCard.querySelector(".delete-btn");

        deleteButton.addEventListener("click", async (event) => {
            console.log("DELETE button clicked");

            try {
                await axios.delete(`/api/v1/funding-opportunity/${_id}`);
                requestCard.remove();
            } catch (error) {
                console.log(error.message);
                alert("Sorry, could not approve this funding opportunity. Please try again later.");
            }
        });

        deleteButton.setAttribute("funding_opportunity_id", _id); //incase needed later
    }); //END: ForEach
}

const categoryDropDown = document.querySelector("#category-dropdown");
categoryDropDown.addEventListener("input", async (event) => {

    console.log(categoryDropDown.value);

    if (categoryDropDown.value === "All Options") {
        await loadOpportunities("");
        return;
    }

    const query_params = `?type=${categoryDropDown.value}`;
    await loadOpportunities(query_params);

})

// When page loads:
loadOpportunities("");