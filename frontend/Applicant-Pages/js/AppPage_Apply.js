// Get the file input, PDF viewer, and funding opportunity title elements
const cv_file = document.getElementById('cv_file');
const application_form_file = document.getElementById('application_form_file');
const other_file = document.getElementById('application_form_file');
const pdfIframe = document.getElementById('pdfIframe');
const pdfViewer = document.getElementById('pdfViewer');
const pdfEmbed = document.getElementById('pdfEmbed');
const fundingOpportunityTitle = document.querySelector(".funding-opportunity-title");

// Get the view buttons
const viewCVButton = document.getElementById('view-cv-button');
const viewApplicationFormButton = document.getElementById('view-application-form-button');
const viewOtherButton = document.getElementById('view-other-button');

// Get the submit button, contact, and reason elements
const submitButton = document.querySelector("#submit-button");
const contact = document.querySelector("#contact");
const reason = document.querySelector("#message");
const messageTextarea = document.getElementById('message');

// Get the funding opportunity ID and user email from cookies
let funding_opportunity_id;
let userEmail;
const cookies = document.cookie; // Get all cookies as a single string
const cookieArray = cookies.split('; '); // Split into an array of individual cookies
for (const cookie of cookieArray) {
  const [name, value] = cookie.split('=');
  if (name === 'funding_opportunity_id') {
    funding_opportunity_id = value;
  }
  if (name === 'email') {
    userEmail = value;
  }
}

console.log(`FUNDING OPPORTUNITY ID: ${funding_opportunity_id}`);

// Get the user and funding opportunity data
let user;
let funding_opportunity;
document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    // Get the funding opportunity details
    let response = await axios.get(`api/v1/funding-opportunity?_id=${funding_opportunity_id}`);
    funding_opportunity = response.data[0];
    fundingOpportunityTitle.textContent = `${funding_opportunity.title} Application`;

    // Get the user details
    response = await axios.get(`api/v1/applicant?email=${userEmail}`);
    user = response.data[0];
  } catch (error) {
    alert("Sorry, could not load your information");
  }
});

// Variables to store the file data
let cv_data;
let application_form_data;
let other_data;

// Add event listeners for file input changes
cv_file.addEventListener("change", (event) => {
  pdfIframe.style.display = "block";
  const selectedFile = cv_file.files[0];
  let fileReader = new FileReader();
  fileReader.readAsDataURL(selectedFile);
  fileReader.onload = function (fileLoadedEvent) {
    cv_data = fileLoadedEvent.target.result;
    pdfIframe.setAttribute("src", cv_data);
  };
});

application_form_file.addEventListener("change", (event) => {
  pdfIframe.style.display = "block";
  const selectedFile = application_form_file.files[0];
  let fileReader = new FileReader();
  fileReader.readAsDataURL(selectedFile);
  fileReader.onload = function (fileLoadedEvent) {
    application_form_data = fileLoadedEvent.target.result;
    pdfIframe.setAttribute("src", application_form_data);
  };
});

other_file.addEventListener("change", (event) => {
  pdfIframe.style.display = "block";
  const selectedFile = other_file.files[0];
  let fileReader = new FileReader();
  fileReader.readAsDataURL(selectedFile);
  fileReader.onload = function (fileLoadedEvent) {
    other_data = fileLoadedEvent.target.result;
    pdfIframe.setAttribute("src", other_data);
  };
});

// Add click event listeners to the view buttons
viewCVButton.addEventListener("click", (event) => {
  pdfIframe.setAttribute("src", cv_data);
});
viewApplicationFormButton.addEventListener("click", (event) => {
  pdfIframe.setAttribute("src", application_form_data);
});
viewOtherButton.addEventListener("click", (event) => {
  pdfIframe.setAttribute("src", other_data);
});

// Add a click event listener to the submit button
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Validate the input
  if (!contact.value || !messageTextarea.value) {
    alert("Please enter valid Contact Details and Reason");
    return;
  }

  // Create the application object
  const application = {
    applicant_email: userEmail,
    reason: reason.value,
    contact_number: contact.value,
    cv_data,
    application_form_data,
    other_data,
    funding_opportunity_id
  };

  try {
    // Send a POST request to the API to create a new application
    await axios.post("api/v1/application", application);
    alert("Application Submitted Successfully!");
    contact.value = "";
  } catch (error) {
    console.log(error.response.data);
    alert(`Sorry, could not submit application. Reason: ${error.response.data.message}`);
  }
});

// Add click event listeners to the remove file buttons
document.querySelector(".remove-cv-span").addEventListener("click", (event) => {
  cv_file.value = "";
  cv_data = "";
});
document.querySelector(".remove-application-span").addEventListener("click", (event) => {
  application_form_file.value = "";
  application_form_data = "";
});
document.querySelector(".remove-other-span").addEventListener("click", (event) => {
  other_file.value = "";
  other_data = "";
});

// Add a click event listener to the logo element
document.getElementById("logo").addEventListener("click", event => {
  console.log("LOGO CLICKED");
  // Redirect the user to the home page when the logo is clicked
  window.location.href = "/home";
});