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
    console.log(fundingOpportunities);

    if (fundingOpportunities.length <= 0){
        alert("There are currently no funding opportunities.");
        return;
    }

    fundingOpportunities.forEach((fundingOpportunity) => {
        let { _id, title,
            company_name,
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
                    <div class="button-container">
                        <button class="approve-btn">Approve</button>
                        <button class="deny-btn">Deny</button>
                    </div>
                </div>`;

        requestCard.innerHTML = requestCardInnerHTML;

        let adImage = requestCard.querySelector(".ad-image");
        if (!image_data) {
            // TODO: Change the placeholder image
            adImage.src = "https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg?w=976&h=549"; // Placeholder image
        } else {
            adImage.src = image_data;
        }

        requestSection.appendChild(requestCard);


        // APPROVE AND DENY OF CURRENT BUTTONS [still in forEach]
        const approveButton = requestCard.querySelector(".approve-btn");
        const denyButton = requestCard.querySelector(".deny-btn");

        approveButton.addEventListener("click", async (event) => {
            console.log("Approve button clicked");

            try {
                await axios.put(`/api/v1/funding-opportunity/${_id}`, {
                    admin_status: "Approved"
                });
                requestCard.remove();
            } catch (error) {
                console.log(error.message);
                alert("Sorry, could not approve this funding opportunity. Please try again later.");
            }
        })

        denyButton.addEventListener("click", async (event) => {
            console.log("Deny button clicked");

            try {
                await axios.put(`/api/v1/funding-opportunity/${_id}`, {
                    admin_status: "Rejected"
                });
                requestCard.remove();
            } catch (error) {
                alert("Sorry, could not reject this funding opportunity. Please try again later.");
                console.log(error.message);
            }
        })

        approveButton.setAttribute("funding_opportunity_id", _id); //incase needed later
    }); //END: ForEach
}

const categoryDropDown = document.querySelector("#category-dropdown");
categoryDropDown.addEventListener("input", async (event) => {

    console.log(categoryDropDown.value);

    if (categoryDropDown.value === "All Options") {
        const query_params = "?admin_status=Pending";
        await loadOpportunities(query_params);
        return;
    }

    const query_params = `?admin_status=Pending&type=${categoryDropDown.value}`;
    await loadOpportunities(query_params);
});

// when page loads
document.addEventListener("DOMContentLoaded", async () => {
    const query_params = "?admin_status=Pending";
    await loadOpportunities(query_params);
});