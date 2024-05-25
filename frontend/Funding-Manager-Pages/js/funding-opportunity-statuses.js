

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
            // adImage.src = "https://images.pexels.com/photos/210679/pexels-photo-210679.jpeg";
            adImage.src = "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg";
            // adImage.src = "https://www.topgear.com/sites/default/files/2022/03/TopGear%20-%20Tesla%20Model%20Y%20-%20003.jpg?w=976&h=549"
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


const generateCSV = async () => {
    let response;

    try {
        response = await axios.get("api/v1/funding-opportunities");
    } catch (error) {
        console.log(error.message);
        return;
    }

    const fundingOpportunities = response.data;
    let csvData = [];

    fundingOpportunities.forEach((fundingOpportunity) => {

        let { deadline } = fundingOpportunity;
        deadline = deadline.slice(0, deadline.indexOf("T")) // Just get the day, month, year and skip the time

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

    // Convert JSON to CSV
    const csv = json2csv.parse(csvData, {
        delimiter: ';'
    });

    return csv;
};

const downloadCSVButton = document.getElementById("fundDetails");

const download = (filename, csv) => {
    // Add end-of-line character after each row
    csv = csv.replace(/,\n/g, ',\r\n');

    const element = document.createElement("a");

    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    element.setAttribute("download", filename);

    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// const download = (filename, csv) => {
//     const element = document.createElement("a");

//     element.setAttribute("href", `data:text/csv;charset=utf-8,${csv}`);
//     element.setAttribute("download", filename);

//     element.style.display = "none";

//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
// }

downloadCSVButton.addEventListener("click", async () => {
    try {
        const csv = await generateCSV();
        download("funding_opportunities.csv", csv);
    } catch (error) {
        console.log(error.message);
    }
});

document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED")
    window.location.href = "/home";
})