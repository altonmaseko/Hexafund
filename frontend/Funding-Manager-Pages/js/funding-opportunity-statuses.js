

const requestSection = document.querySelector(".requests")

const loadOpportunities = async (query_params) => {
    requestSection.textContent = "" // Clear it

    let response
    try {
        response = await axios.get("api/v1/funding-opportunities" + query_params)
    } catch (error) {
        alert("Sorry, couldnt load the funding opportunities")
        console.log(error.message)
        return
    }
    const fundingOpportunities = response.data

    if (fundingOpportunities.length <= 0) {
        alert("You have no funding opportunities here :(")
        return
    }

    fundingOpportunities.forEach((fundingOpportunity) => {
        let { title,
            company_name,
            funding_manager_email,
            admin_status,
            type,
            funding_opportunity_id,
            deadline,
            description,
            funding_amount,
            available_slots, image_data } = fundingOpportunity

        deadline = deadline.slice(0, deadline.indexOf("T")) // Just get the day, month, year and skip the time

        const requestCard = document.createElement("div")
        requestCard.classList.add("request-card")

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
                </div>`

        requestCard.innerHTML = requestCardInnerHTML

        let adImage = requestCard.querySelector(".ad-image");
        if (!image_data) {
            adImage.src = "https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg?w=976&h=549"
        } else {
            adImage.src = image_data
        }

        if (admin_status === "Approved") {
            requestCard.querySelector(".status-indicator").classList.add("approved")
        } else if (admin_status === "Rejected") {
            requestCard.querySelector(".status-indicator").classList.add("denied")
        } else if (admin_status === "Pending") {
            requestCard.querySelector(".status-indicator").classList.add("pending")
        }

        requestSection.appendChild(requestCard);

        // requestSection.appendChild(document.createElement("br"))
    }) //END: ForEach

}

let userEmail;

const categoryDropDown = document.querySelector("#category-dropdown")
categoryDropDown.addEventListener("input", async (event) => {

    console.log(categoryDropDown.value)

    if (categoryDropDown.value === "All Options") {
        const query_params = `?funding_manager_email=${userEmail}`
        await loadOpportunities(query_params)
        return
    }

    const query_params = `?funding_manager_email=${userEmail}&type=${categoryDropDown.value}`
    await loadOpportunities(query_params)

})



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

// When page loads:
const query_params = `?funding_manager_email=${userEmail}`
loadOpportunities(query_params)


