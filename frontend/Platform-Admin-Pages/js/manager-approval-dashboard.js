document.addEventListener("DOMContentLoaded", () => {
    let requests_section = document.getElementById("requests");
    let refresh_btn = document.getElementById("refresh-btn");

    // Define the query parameters to fetch the funding managers with account pending approval
    const query_params = "?account_details.account_active=false&account_details.reason=Account pending approval from a Platform Admin";

    // Add a click event listener to the refresh button
    refresh_btn.addEventListener("click", () => {
        // Make a GET request to the "/api/v1/funding-managers" endpoint with the defined query parameters
        axios.get("/api/v1/funding-managers" + query_params).then((fundingManagers) => {
            // Clear the content of the requests section
            requests_section.innerHTML = "";

            // Loop through the funding managers and create a request card for each one
            fundingManagers.data.forEach((manager) => {
                let request_card = document.createElement("section");
                request_card.classList.add("request-card");

                // Set the HTML content of the request card
                request_card.innerHTML = `
                    <h3>${manager.name}</h3>
                    <p>Email: ${manager.email}</p>
                    <p>Company: ${manager.company}</p>
                    <div class="action-buttons">
                        <button class="approve-btn">Approve</button>
                        <button class="deny-btn">Deny</button>
                    </div>
                `;

                // Get the approve and deny buttons
                let approve_btn = request_card.querySelector(".approve-btn");
                let deny_btn = request_card.querySelector(".deny-btn");

                // Add click event listeners to the approve and deny buttons
                approve_btn.addEventListener("click", () => {
                    // Make a PUT request to the "/api/v1/funding-managers/:email" endpoint to approve the account
                    axios.put("/api/v1/funding-managers/" + manager.email, {
                        account_details: {
                            account_active: true,
                            reason: "Account Approved"
                        }
                    }).then((response) => {
                        // Refresh the requests section
                        refresh_btn.click();
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                });

                deny_btn.addEventListener("click", () => {
                    // Make a PUT request to the "/api/v1/funding-managers/:email" endpoint to deny the account
                    axios.put("/api/v1/funding-managers/" + manager.email, {
                        account_details: {
                            account_active: false,
                            reason: "Account Request Denied"
                        }
                    }).then((response) => {
                        // Refresh the requests section
                        refresh_btn.click();
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                });

                // Append the request card to the requests section
                requests_section.appendChild(request_card);
            });
        });
    });
});

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
    console.log("LOGO CLICKED")
    // Redirect the user to the "/home" page
    window.location.href = "/home";
});