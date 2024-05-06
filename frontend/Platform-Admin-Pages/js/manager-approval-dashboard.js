document.addEventListener("DOMContentLoaded", () => {
    let requests_section = document.getElementById("requests");
    let refresh_btn = document.getElementById("refresh-btn");

    const query_params = "?account_details.account_active=false&account_details.reason=Account pending approval from a Platform Admin";

    refresh_btn.addEventListener("click", () => {
        axios.get("/api/v1/funding-managers" + query_params).then((fundingManagers) => {
            requests_section.innerHTML = "";
            fundingManagers.data.forEach((manager) => {
                let request_card = document.createElement("section");
                request_card.classList.add("request-card");
        
                request_card.innerHTML = `
                    <h3>${manager.name}</h3>
                    <p>Email: ${manager.email}</p>
                    <p>Company: ${manager.company}</p>
                    <div class="action-buttons">
                        <button class="approve-btn">Approve</button>
                        <button class="deny-btn">Deny</button>
                    </div>
                `;

                let approve_btn = request_card.querySelector(".approve-btn");
                let deny_btn = request_card.querySelector(".deny-btn");

                approve_btn.addEventListener("click", () => {
                    axios.put("/api/v1/funding-managers/" + manager.email, {
                        account_details: {
                            account_active: true,
                            reason: "Account Approved"
                        }
                    }).then((response) => {
                        refresh_btn.click();
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                });

                deny_btn.addEventListener("click", () => {
                    axios.put("/api/v1/funding-managers/" + manager.email, {
                        account_details: {
                            account_active: false,
                            reason: "Account Request Denied"
                        }
                    }).then((response) => {
                        refresh_btn.click();
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                });
        
                requests_section.appendChild(request_card);
            });
        });
    });
});