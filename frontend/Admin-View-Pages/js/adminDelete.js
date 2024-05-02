axios.defaults.baseURL = 'https://funding-website.azurewebsites.net/'; // PRODUCTION URL
// axios.defaults.baseURL = 'http://localhost:3000/'; // LOCAL URL

const requestSection = document.querySelector(".requests")

const loadOpportunities = async (query_params) => {
    requestSection.textContent = ""
    let response
    try {
        response = await axios.get("api/v1/funding-opportunities" + query_params)
    } catch (error) {
        alert("Sorry, couldnt load the funding opportunities")
        console.log(error.message)
        return
    }
    const fundingOpportunities = response.data

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
                    <button class="delete-btn">Delete</button>
                </div>`

        requestCard.innerHTML = requestCardInnerHTML
        requestSection.appendChild(requestCard);


        // DELETE FOR CURRENT BUTTON [still in forEach]
        const deleteButton = requestCard.querySelector(".delete-btn")

        deleteButton.addEventListener("click", async (event) => {
            console.log("DELETE button clicked")

            try {
                await axios.delete(`/api/v1/funding-opportunity/${funding_opportunity_id}`)
                requestCard.remove()
            } catch (error) {
                console.log(error.message)
                alert("Sorry, could not approve this funding opportunity. Please try again later.")
            }
        })

        deleteButton.setAttribute("funding_opportunity_id", funding_opportunity_id) //incase needed later

        // requestSection.appendChild(document.createElement("br"))
    }) //END: ForEach
}

const categoryDropDown = document.querySelector("#category-dropdown")
categoryDropDown.addEventListener("input", async (event) => {

    console.log(categoryDropDown.value)

    if (categoryDropDown.value === "All Options") {
        const query_params = `?admin_status=Pending`
        await loadOpportunities(query_params)
        return
    }

    const query_params = `?admin_status=Pending&type=${categoryDropDown.value}`
    await loadOpportunities(query_params)

})

// When page loads:
loadOpportunities("")
