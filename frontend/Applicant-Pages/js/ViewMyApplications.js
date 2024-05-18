document.getElementById("checkStatusBtn").addEventListener("click", function() {
    alert("Notification: Your status is pending.");
});

const sectionsContainer = document.querySelector(".sectionsContainer")
const pdfIframe = document.querySelector(".pdf");
const pageTitle = document.querySelector("#page-title");


let userEmail;
let userName;
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
  const [name, value] = cookie.split('=');
  console.log(value)
  if (name === 'email') {
    userEmail = value
  }
  if (name === 'name') {
    userName = value
  }
}

pageTitle.textContent = `Here are your applications, ${userName}`;

const flow = async () => {
  sectionsContainer.textContent = "" // Clear it



  let response;
  // GET ALL APPLICATIONS
  try {
    response = await axios.get(`api/v1/applications?applicant_email=${userEmail}`);
  } catch (error) {
    alert("COULD NOT GET APPLICATIONS")
    return
  }
  const applications = response.data;

  console.log("APPLICATIONS")
  console.log(applications)

  if (applications.length <= 0) {
    alert("You have not made any application")
    return
  }


  // Get all funding opportunities the funding manager owns

  applications.forEach(async application => {
    let fundingOpportunity
    try {
      response = await axios.get(`api/v1/funding-opportunity?_id=${application.funding_opportunity_id}`)
      fundingOpportunity = response.data[0];
    } catch (error) {
      alert("Could not get funding opportunity details");
    }

    const card = document.createElement("div");
    card.classList.add("card");

    const cardInnerHTML = `
    <img class="funding-opportunity-img" src="" alt="">
    <div class="align-horizontally">
      <p class="title">${fundingOpportunity.title}</p>
      <box-icon name='trash-alt' class="delete-full-application"></box-icon> 
    </div>
    <p class="funding-amount">Amount: ${fundingOpportunity.funding_amount}</p>
    <p class="description">Description: ${fundingOpportunity.description}</p>
    <hr>
    <p class="status"><b>Status: ${application.status}</b></p>
    <div class="align-horizontally">
      <div class="button-trash-container">
        <button class="cv-button">View CV</button><box-icon name='trash' class="delete-cv"></box-icon> 
      </div>
      <div class="button-trash-container">
      <button class="application-button">View Application Form</button><box-icon name='trash' class="delete-application"></box-icon> 
      </div>
      <div class="button-trash-container">
        <button class="other-button">View Other</button> <box-icon name='trash' class="delete-other"></box-icon> 
      </div>      
    </div>
    
    `

    card.innerHTML = cardInnerHTML;
    sectionsContainer.appendChild(card);

    // Buttons
    const cvButton = card.querySelector(".cv-button");
    const applicationButton = card.querySelector(".application-button");
    const otherButton = card.querySelector(".other-button");

    const deleteCV = card.querySelector(".delete-cv")
    const deleteApplication = card.querySelector(".delete-application")
    const deleteOther = card.querySelector(".delete-other")
    const deleteFullApplication = card.querySelector(".delete-full-application")

    // View documents buttons
    cvButton.addEventListener("click", event => {

      if (!application.cv_data) {
        alert("You have not submitted that document.")
        return
      }
      pdfIframe.src = application.cv_data;

      // Scroll to top of page
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    })
    applicationButton.addEventListener("click", event => {
      if (!application.application_form_data) {
        alert("You have not submitted that document.")
        return
      }
      pdfIframe.src = application.application_form_data;

      // Scroll to top of page
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    })
    otherButton.addEventListener("click", event => {
      if (!application.other_data) {
        alert("You have not submitted that document.")
        return
      }
      pdfIframe.src = application.other_data;

      // Scroll to top of page
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    })

    // Delete Documents buttons
    deleteCV.addEventListener("click", async event => {
      if (!application.cv_data) {
        alert("There is no document to delete")
        return
      }
      if (application.status !== "Pending") {
        alert("You can only delete documents from pending applications. Consider deleting the application and making a new one.")
        return
      }
      if (!confirm("Are your sure you want to delete this document")) {
        return;
      }
      try {
        await axios.put(`api/v1/application/${application._id}`, {
          cv_data: ""
        })
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Could not delete the document. Sorry :)")
        return
      }
    })
    deleteApplication.addEventListener("click", async event => {
      if (!application.application_form_data) {
        alert("There is no document to delete")
        return
      }
      if (application.status !== "Pending") {
        alert("You can only delete documents from pending applications. Consider deleting the application and making a new one.")
        return
      }
      if (!confirm("Are your sure you want to delete this document")) {
        return;
      }
      try {
        await axios.put(`api/v1/application/${application._id}`, {
          application_form_data: ""
        })
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Could not delete the document. Sorry :)")
        return
      }
    })
    deleteOther.addEventListener("click", async event => {
      if (!application.other_data) {
        alert("There is no document to delete")
        return
      }
      if (application.status !== "Pending") {
        alert("You can only delete documents from pending applications. Consider deleting the application and making a new one.")
        return
      }
      if (!confirm("Are your sure you want to delete this document")) {
        return;
      }
      try {
        await axios.put(`api/v1/application/${application._id}`, {
          other_data: ""
        })
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Could not delete the document. Sorry :)")
        return
      }
    })
    // Delete application from database
    deleteFullApplication.addEventListener("click", async event => {
      if (application.status !== "Pending") {
        alert("Can only delete pending applications.")
        return
      }
      if (!confirm("Are you sure you want to DELETE this application?")) {
        return
      }
      try {
        await axios.delete(`api/v1/application/${application._id}`)
        window.location.reload();
      } catch (error) {
        console.log(error)
        alert("Sorry, could not delete application. Please try again later.")
      }
    })



  }) //END: ForEach




} // END: FLOW
flow();




