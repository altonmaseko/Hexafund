
const cv_file = document.getElementById('cv_file');
const application_form_file = document.getElementById('application_form_file');
const other_file = document.getElementById('application_form_file');

const pdfIframe = document.getElementById('pdfIframe');
const pdfViewer = document.getElementById('pdfViewer');
const pdfEmbed = document.getElementById('pdfEmbed');
const fundingOpportunityTitle = document.querySelector(".funding-opportunity-title");

const viewCVButton = document.getElementById('view-cv-button');
const viewApplicationFormButton = document.getElementById('view-application-form-button');
const viewOtherButton = document.getElementById('view-other-button');

const submitButton = document.querySelector("#submit-button");
const contact = document.querySelector("#contact");
const reason = document.querySelector("#message");
const messageTextarea = document.getElementById('message');

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

let user;
let funding_opportunity;
document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    // Get funding opportunity
    let response = await axios.get(`api/v1/funding-opportunity?_id=${funding_opportunity_id}`);
    funding_opportunity = response.data[0];
    fundingOpportunityTitle.textContent = `${funding_opportunity.title} Application`

    // Get User
    response = await axios.get(`api/v1/applicant?email=${userEmail}`);
    user = response.data[0];

  } catch (error) {
    alert("Sorry, could not load your information");
  }

})

let cv_data;
let application_form_data;
let other_data;

cv_file.addEventListener("change", (event) => {
  pdfIframe.style.display = "block";
  const selectedFile = cv_file.files[0];

  // FileReader function for read the file.
  let fileReader = new FileReader();

  // Convert data to base64
  fileReader.readAsDataURL(selectedFile);

  // Onload of file read the file content
  fileReader.onload = function (fileLoadedEvent) {
    cv_data = fileLoadedEvent.target.result;
    pdfIframe.setAttribute("src", cv_data);
  }
})

application_form_file.addEventListener("change", (event) => {
  pdfIframe.style.display = "block";
  const selectedFile = application_form_file.files[0];

  // FileReader function for read the file.
  let fileReader = new FileReader();

  // Convert data to base64
  fileReader.readAsDataURL(selectedFile);

  // Onload of file read the file content
  fileReader.onload = function (fileLoadedEvent) {
    application_form_data = fileLoadedEvent.target.result;
    pdfIframe.setAttribute("src", application_form_data);
  }
})

other_file.addEventListener("change", (event) => {
  pdfIframe.style.display = "block";
  const selectedFile = other_file.files[0];

  // FileReader function for read the file.
  let fileReader = new FileReader();

  // Convert data to base64
  fileReader.readAsDataURL(selectedFile);

  // Onload of file read the file content
  fileReader.onload = function (fileLoadedEvent) {
    other_data = fileLoadedEvent.target.result;
    pdfIframe.setAttribute("src", other_data);
  }
})

viewCVButton.addEventListener("click", (event) => {
  pdfIframe.setAttribute("src", cv_data);
})
viewApplicationFormButton.addEventListener("click", (event) => {
  pdfIframe.setAttribute("src", application_form_data);
})
viewOtherButton.addEventListener("click", (event) => {
  pdfIframe.setAttribute("src", other_data);
})

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  // Validate Input
  if (!contact.value || !messageTextarea.value) {
    alert("Please enter valid Contact Details and Reason");
    return;
  }

  const application = {
    applicant_email: userEmail,
    reason: reason.value,
    contact_number: contact.value,
    cv_data,
    application_form_data,
    funding_opportunity_id
  }

  try {
    await axios.post("api/v1/application", application);
    alert("Application Submitted Successfully!");
    contact.value = "";
  } catch (error) {
    console.log(error.response.data);
    alert(`Sorry could not submit application. Reason: ${error.response.data.message}`);
  }

})




// WORD COUNT STUFF:
// const wordCount = document.getElementById('wordCount');


// messageTextarea.addEventListener('input', function () {

//   const words = this.value.trim().split(/\s+/);

//   // Update the word count paragraph not working yet
//   wordCount.textContent = `Word count: ${ words.length } / 100`;

//   // Check if the number of words exceeds 100 and truncate the input if needed
//   if (words.length > 100) {
//     this.value = words.slice(0, 100).join(' ');
//     wordCount.textContent = 'Word count: 100/100';
//   }
// });
