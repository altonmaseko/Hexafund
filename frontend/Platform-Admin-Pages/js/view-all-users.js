/**
 * Asynchronous function to generate a CSV file for funding managers.
 * @returns {string} - The generated CSV data.
 */
const generate_FM_CSV = async () => {
    let response, opportunities;

    try {
        // Fetch the funding managers and funding opportunities from the API
        response = await axios.get("api/v1/funding-managers");
        opportunities = (await axios.get("api/v1/funding-opportunities")).data;
    } catch (error) {
        console.log(error.message);
        return;
    }

    const funding_managers = response.data;
    let csvData = [];

    // Loop through the funding managers and create an object for each one
    funding_managers.forEach(manager => {
        let temp = opportunities.filter(opportunity => opportunity.funding_manager_email === manager.email);

        const manager_obj = {
            name: manager.name,
            email: manager.email,
            company_name: manager.company,
            num_opportunities: temp.length
        };

        csvData.push(manager_obj);
    });

    // Convert the CSV data to a CSV string
    const csv = json2csv.parse(csvData, {
        delimiter: ",",
        eol: "\n"
    });
    console.log(csv);

    return csv;
}

/**
 * Asynchronous function to generate a CSV file for applicants.
 * @returns {string} - The generated CSV data.
 */
const generate_Applicant_CSV = async () => {
    let response, applications;

    try {
        // Fetch the applicants and applications from the API
        response = await axios.get("api/v1/applicants");
        applications = (await axios.get("api/v1/applications")).data;
    } catch (error) {
        console.log(error.message);
        return;
    }

    const applicants = response.data;
    let csvData = [];

    // Loop through the applicants and create an object for each one
    applicants.forEach(applicant => {
        let temp = applications.filter(application => application.applicant_email === applicant.email);
        let accepted = 0, rejected = 0, pending = 0;

        // Count the number of accepted, rejected, and pending applications for each applicant
        temp.forEach(application => {
            if (application.status === "Accepted") {
                accepted++;
            } else if (application.status === "Rejected") {
                rejected++;
            } else {
                pending++;
            }
        });

        const applicant_obj = {
            name: applicant.name,
            email: applicant.email,
            num_applications: temp.length,
            accepted_applications: accepted,
            rejected_applications: rejected,
            pending_applications: pending
        };

        csvData.push(applicant_obj);
    });

    // Convert the CSV data to a CSV string
    const csv = json2csv.parse(csvData, {
        delimiter: ",",
        eol: "\n"
    });
    console.log(csv);

    return csv;
}

/**
 * Function to create a download link for a CSV file.
 * @param {string} filename - The name of the CSV file.
 * @param {string} csv - The CSV data.
 */
const download = (filename, csv) => {
    // Add end-of-line character after each row
    csv = csv.replace(/,\n/g, ',\r\n');

    const element = document.createElement("a");

    // Set the download link attributes
    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    element.setAttribute("download", filename);

    element.style.display = "none";

    // Append the download link to the body, click it, and then remove it
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Get the buttons for downloading the CSV files
const download_FM_CSV = document.getElementById("fundManagerStats");
const download_Applicant_CSV = document.getElementById("applicantStats");

// Add click event listeners to the buttons
download_FM_CSV.addEventListener("click", async () => {
    try {
        // Generate the funding manager CSV and download it
        const csv = await generate_FM_CSV();
        download("funding_managers.csv", csv);
    } catch (error) {
        console.log(error.message);
    }
});

download_Applicant_CSV.addEventListener("click", async () => {
    try {
        // Generate the applicant CSV and download it
        const csv = await generate_Applicant_CSV();
        download("applicants.csv", csv);
    } catch (error) {
        console.log(error.message);
    }
});

//loading the data 
// Get the users section element
let users_section = document.getElementById("users");

/**
 * Function to refresh the users section based on the selected option in the dropdown.
 */
const refresh = () => {
    // Get the dropdown element
    let drop_down = document.getElementById("drop_down");

    // Clear the users section
    users_section.innerHTML = '';

    // Check the selected option in the dropdown
    if (drop_down.value === "funding_managers") {
        // Fetch and display the funding managers
        axios.get("/api/v1/funding-managers").then((fundingManagers) => {
            fundingManagers.data.forEach((manager) => {
                let user_card = document.createElement("section");
                user_card.classList.add("user-card");

                // Determine the button text based on the manager's account status
                const btn_text = manager.account_details.account_active ? "Block Account" : "Unblock Account";

                // Create the HTML content for the user card
                user_card.innerHTML = `
                        <h3>${manager.name}</h3>
                        <p>Email: ${manager.email}</p>
                        <p>Company: ${manager.company}</p>
                        <div class="action-buttons">
                            <button class="block-btn">${btn_text}</button>
                        </div>
                    `;

                // Add a click event listener to the block button
                let block_btn = user_card.querySelector(".block-btn");
                block_btn.addEventListener("click", () => {
                    // Update the manager's account status
                    if (block_btn.textContent === "Block Account") {
                        axios.put("/api/v1/funding-managers/" + manager.email, {
                            account_details: {
                                account_active: false,
                                reason: "Account Blocked by Platform Admin"
                            }
                        }).then((response) => {
                            // Add email sending functionality here
                            console.log(response.data);
                        }).catch((error) => {
                            console.log(error)
                        });
                        block_btn.textContent = "Unblock Account";
                    }
                    else {
                        axios.put("/api/v1/funding-managers/" + manager.email, {
                            account_details: {
                                account_active: true,
                                reason: "Account Unblocked by Platform Admin",
                            }
                        }).then((response) => {
                            // Add email sending functionality here
                            console.log(response.data);
                        }).catch((error) => {
                            console.log(error)
                        });
                        block_btn.textContent = "Block Account";
                    }
                });

                users_section.appendChild(user_card);
            });
        });
    } else if (drop_down.value === "applicants") {
        // Fetch and display the applicants
        axios.get("/api/v1/applicants").then((applicants) => {
            applicants.data.forEach((applicant) => {
                let user_card = document.createElement("section");
                user_card.classList.add("user-card");

                // Determine the button text based on the applicant's account status
                const btn_text = applicant.account_details.account_active ? "Block Account" : "Unblock Account";

                // Create the HTML content for the user card
                user_card.innerHTML = `
                        <h3>${applicant.name}</h3>
                        <p>Email: ${applicant.email}</p>
                        <div class="action-buttons">
                            <button class="block-btn">${btn_text}</button>
                        </div>
                    `;

                // Add a click event listener to the block button
                let block_btn = user_card.querySelector(".block-btn");
                block_btn.addEventListener("click", () => {
                    // Update the applicant's account status
                    if (block_btn.textContent === "Block Account") {
                        axios.put("/api/v1/applicant/" + applicant.email, {
                            account_details: {
                                account_active: false,
                                reason: "Account Blocked by Platform Admin"
                            }
                        }).then((response) => {
                            // Add email sending functionality here
                            console.log(response.data);
                        }).catch((error) => {
                            console.log(error)
                        });
                        block_btn.textContent = "Unblock Account"
                    }
                    else {
                        axios.put("/api/v1/applicant/" + applicant.email, {
                            account_details: {
                                account_active: true,
                                reason: "Account Unblocked by Platform Admin"
                            }
                        }).then((response) => {
                            // Add email sending functionality here
                            console.log(response.data);
                        }).catch((error) => {
                            console.log(error)
                        });
                        block_btn.textContent = "Block Account";
                    }
                });

                users_section.appendChild(user_card);
            });
        });
    } else {
        // Fetch and display all users
        axios.get("/api/v1/users").then((users) => {
            users.data.forEach((user) => {
                let user_card = document.createElement("section");
                user_card.classList.add("user-card");

                // Create the HTML content for the user card
                user_card.innerHTML = `
                        <h3>${user.name}</h3>
                        <p>Email: ${user.email}</p>
                        <p>Role: ${user.role}</p>
                    `;

                users_section.appendChild(user_card);
            });
        });
    }
}

// Add an event listener to the dropdown element to trigger the refresh function when the value changes
document.addEventListener("DOMContentLoaded", () => {
    let drop_down = document.getElementById("drop_down");
    drop_down.addEventListener("change", refresh);
})

// Fetch and display all users initially
axios.get("/api/v1/users").then((users) => {
    users.data.forEach((user) => {
        let user_card = document.createElement("section");
        user_card.classList.add("user-card");

        user_card.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role}</p>
            `;

        users_section.appendChild(user_card);
    });
});

// Add a click event listener to the logo element to redirect to the home page
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED")
    window.location.href = "/home";
});