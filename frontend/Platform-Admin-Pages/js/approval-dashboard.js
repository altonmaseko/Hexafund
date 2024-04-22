const FundingManager = require("../../../models/FundingManager");

const { FUNDING_MANAGER, PLATFORM_ADMIN } = require("./constants/roles")

document.addEventListener("DOMContentLoaded", (event) => {
    let requests_section = document.getElementsByClassName("requests")[0];
    let refresh_button = document.getElementById("refresh-button");
    let fundingManagers = [];

    refresh_button.addEventListener("click", (event) => {
        FundingManager.find({ "account_details.account_active": false, "account_details.reason": "" }).exec()
            .then((managers) => {
                fundingManagers = managers;
                fundingManagers.forEach((manager) => {
                    let request_card = document.createElement("section");
                    request_card.classList.add("request-card");
        
                    request_card.innerHTML = `
                        <h3>${manager.name}</h3>
                        <p>Email: ${manager.email}</p>
                        <p>Role: ${FUNDING_MANAGER}</p>
                        <div class="action-buttons">
                            <button class="approve-btn" onclick="approve('${manager.email}')">Approve</button>
                            <button class="deny-btn" onclick="deny('${manager.email}')">Deny</button>
                        </div>
                    `;
        
                    requests_section.appendChild(request_card);
                });
            }).catch((err) => {
                console.log(err);
            });
    });
});

const approve = (email) => {
    FundingManager.updateOne(
        { "email": email }, 
        {
            $set: {
                "account_details.account_active": true, 
                "account_details.reason": `Account has been approved by a ${PLATFORM_ADMIN}`
            } 
        }
    ).then(() => {
        let approve_btn = document.getElementsByClassName("approve-btn")[0];
        approve_btn.click();

        console.log(`${email} has been approved`);
    }).catch((err) => {
        console.log(err);
    });
}

const deny = (email) => {
    FundingManager.updateOne(
        { "email": email }, 
        {
            $set: { 
                "account_details.reason": `Account has been denied by a ${PLATFORM_ADMIN}` 
            }
        }
    ).then(() => {
        let deny_btn = document.getElementsByClassName("deny-btn")[0];
        deny_btn.click();

        console.log(`${email} has been denied`);
    }).catch((err) => {
        console.log(err);
    });
}