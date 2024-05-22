//black magic for generating csv files
const generate_FM_CSV = async () => {
    let response, opportunities;

    try {
        response = await axios.get("api/v1/funding-managers");
        opportunities = (await axios.get("api/v1/funding-opportunities")).data;
    } catch (error) {
        console.log(error.message);
        return;
    }

    const funding_managers = response.data;
    let csvData = [];

    funding_managers.forEach(manager => {
        let temp = opportunities;
        temp.filter(opportunity => opportunity.funding_manager_email === manager.email);

        const manager_obj = {
            name: manager.name,
            email: manager.email,
            company_name: manager.company,
            num_opportunities: temp.length
        };

        csvData.push(manager_obj);
    });

    const csv = json2csv.parse(csvData, {
        delimiter: ";"
    });
    console.log(csv);

    return csv;
}

const generate_Applicant_CSV = async () => {
    let response, applications;

    try {
        response = await axios.get("api/v1/applicants");
        applications = (await axios.get("api/v1/applications")).data;
    } catch (error) {
        console.log(error.message);
        return;
    }

    const applicants = response.data;
    let csvData = [];

    applicants.forEach(applicant => {
        let temp = applications;
        let accepted = 0, rejected = 0, pending = 0;
        temp.filter(application => application.applicant_email === applicant.email);

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

    const csv = json2csv.parse(csvData, {
        delimiter: ";"
    });
    console.log(csv);

    return csv;
}

const download = (filename, csv) => {
    const element = document.createElement("a");

    element.setAttribute("href", `data:text/csv;charset=utf-8,${csv}`);
    element.setAttribute("download", filename);

    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

const download_FM_CSV = document.getElementById("fundManagerStats");
const download_Applicant_CSV = document.getElementById("applicantStats");

download_FM_CSV.addEventListener("click", async () => {
    try {
        const csv = await generate_FM_CSV();
        download("funding_managers.csv", csv);
    } catch (error) {
        console.log(error.message);
    }
});

download_Applicant_CSV.addEventListener("click", async () => {
    try {
        const csv = await generate_Applicant_CSV();
        download("applicants.csv", csv);
    } catch (error) {
        console.log(error.message);
    }
});

//loading the data 
let users_section = document.getElementById("users");
const refresh = () => {
    let drop_down = document.getElementById("drop_down");

    users.innerHTML = ''; //clear the section

    if (drop_down.value == "funding_managers" /*drop_down.tabIndex === 1*/) {
        axios.get("/api/v1/funding-managers").then((fundingManagers) => {
            fundingManagers.data.forEach((manager) => {
                let user_card = document.createElement("section");
                user_card.classList.add("user-card");

                const btn_text = manager.account_details.account_active ? "Block Account" : "Unblock Account";

                user_card.innerHTML = `
                        <h3>${manager.name}</h3>
                        <p>Email: ${manager.email}</p>
                        <p>Company: ${manager.company}</p>
                        <div class="action-buttons">
                            <button class="block-btn">${btn_text}</button>
                            <button class="delete-btn">Delete Account</button>
                        </div>
                    `;

                let block_btn = user_card.querySelector(".block-btn");
                let delete_btn = user_card.querySelector(".delete-btn");

                block_btn.addEventListener("click", () => {
                    if (block_btn.textContent == "Block Account") {
                        axios.put("/api/v1/funding-managers/" + manager.email, {
                            account_details: {
                                account_active: false,
                                reason: "Account Blocked by Platform Admin"
                            }
                        }).then((response) => {
                            //add email sending functionality here
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
                            //add email sending functionality here
                            console.log(response.data);
                        }).catch((error) => {
                            console.log(error)
                        });
                        block_btn.textContent = "Block Account";
                    }
                });

                delete_btn.addEventListener("click", () => {
                    axios.delete("/api/v1/funding-managers/" + manager.email).then((response) => {
                        refresh();
                        //add sending email functionality here
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                });

                users_section.appendChild(user_card);
            });
        });
    } else if (drop_down.value == "applicants" /*drop_down.tabIndex === 2*/) {
        axios.get("/api/v1/applicants").then((applicants) => {
            applicants.data.forEach((applicant) => {
                let user_card = document.createElement("section");
                user_card.classList.add("user-card");

                const btn_text = applicant.account_details.account_active ? "Block Account" : "Unblock Account";

                user_card.innerHTML = `
                        <h3>${applicant.name}</h3>
                        <p>Email: ${applicant.email}</p>
                        <div class="action-buttons">
                            <button class="block-btn">${btn_text}</button>
                            <button class="delete-btn">Delete Account</button>
                        </div>
                    `;

                let block_btn = user_card.querySelector(".block-btn");
                let delete_btn = user_card.querySelector(".delete-btn");

                block_btn.addEventListener("click", () => {
                    if (block_btn.textContent == "Block Account") {
                        axios.put("/api/v1/applicant/" + applicant.email, {
                            account_details: {
                                account_active: false,
                                reason: "Account Blocked by Platform Admin"
                            }
                        }).then((response) => {
                            //add email sending functionality here
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
                            //add email sending functionality here
                            console.log(response.data);
                        }).catch((error) => {
                            console.log(error)
                        });
                        block_btn.textContent = "Block Account";
                    }
                });

                delete_btn.addEventListener("click", () => {
                    axios.delete("/api/v1/applicant/" + manager.email).then((response) => {
                        refresh();
                        //add sending email functionality here
                        console.log(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                });

                users_section.appendChild(user_card);
            });
        });
    } else {
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
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let drop_down = document.getElementById("drop_down");

    drop_down.addEventListener("change", refresh);
})


// At the beginning, list all users:
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