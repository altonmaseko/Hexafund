

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
        alert("There are currently no funding opportunities :(")
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
            available_slots } = fundingOpportunity

        deadline = deadline.slice(0, deadline.indexOf("T")) // Just get the day, month, year and skip the time

        const requestCard = document.createElement("div")
        requestCard.classList.add("request-card")
        const requestCardInnerHTML = `<div class="card-left">
                    <img src="https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg?w=976&h=549" alt="Image">
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
                    <button class="apply-btn">Apply</button>
                </div>`

        requestCard.innerHTML = requestCardInnerHTML
        requestSection.appendChild(requestCard);


        // APPLY FOR CURRENT BUTTON [still in forEach]
        const applyButton = requestCard.querySelector(".apply-btn")

        applyButton.addEventListener("click", async (event) => {
            alert(`Thanks for applying for ${title}`)
            // Add logic here... 

        })

        applyButton.setAttribute("funding_opportunity_id", funding_opportunity_id) //incase needed later

        // requestSection.appendChild(document.createElement("br"))
    }) //END: ForEach

}

const categoryDropDown = document.querySelector("#category-dropdown")
categoryDropDown.addEventListener("input", async (event) => {

    console.log(categoryDropDown.value)

    if (categoryDropDown.value === "All Options") {
        const query_params = `?admin_status=Approved`
        await loadOpportunities(query_params)
        return
    }

    const query_params = `?admin_status=Approved&type=${categoryDropDown.value}`
    await loadOpportunities(query_params)

})

// When page loads:
const query_params = `?admin_status=Approved`
loadOpportunities(query_params)

const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
let userName;
for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');
    console.log(value)
    if (name === 'name') {
        userName = value
    }
}

document.querySelector(".welcome-h2").textContent = `Welcome, ${userName} :)`

