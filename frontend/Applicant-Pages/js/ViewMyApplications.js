// JavaScript function to add a new section
function addSection() {
  var imageInput = document.getElementById('imageInput');
  var titleInput = document.getElementById('titleInput');
  var fundNameInput = document.getElementById('fundNameInput');
  var amountInput = document.getElementById('amountInput');
  var reasonInput = document.getElementById('reasonInput');
  var sectionsContainer = document.getElementById('sectionsContainer');

  // Getting input values
  var imageFile = imageInput.files[0];
  var titleValue = titleInput.value;
  var fundNameValue = fundNameInput.value;
  var amountValue = amountInput.value;
  var reasonValue = reasonInput.value;

  // Validating input fields
  if (!imageFile || !titleValue || !fundNameValue || !amountValue || !reasonValue) {
    alert('Please fill in all fields.');
    return;
  }

  // Creating a FileReader object to read the image file
  var reader = new FileReader();
  reader.onload = function(event) {
    var imgSrc = event.target.result;

    // Creating elements for the new section
    var section = document.createElement('div');
    section.classList.add('section');

    var title = document.createElement('h2');
    title.textContent = titleValue;

    var image = document.createElement('img');
    image.src = imgSrc;

    var fundNameSubtitle = document.createElement('p');
    fundNameSubtitle.classList.add('subtitle');
    fundNameSubtitle.textContent = 'Fund Name:';
    var fundNameText = document.createElement('p');
    fundNameText.textContent = fundNameValue;

    var amountSubtitle = document.createElement('p');
    amountSubtitle.classList.add('subtitle');
    amountSubtitle.textContent = 'Amount:';
    var amountText = document.createElement('p');
    amountText.textContent = amountValue;

    var reasonSubtitle = document.createElement('p');
    reasonSubtitle.classList.add('subtitle');
    reasonSubtitle.textContent = 'Reason:';
    var reasonText = document.createElement('p');
    reasonText.textContent = reasonValue;

    var deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
      section.remove();
    };

    // Appending elements to the section
    section.appendChild(title);
    section.appendChild(image);
    section.appendChild(fundNameSubtitle);
    section.appendChild(fundNameText);
    section.appendChild(amountSubtitle);
    section.appendChild(amountText);
    section.appendChild(reasonSubtitle);
    section.appendChild(reasonText);
    section.appendChild(deleteButton);

    // Appending the section to the container
    sectionsContainer.appendChild(section);
  };

  // Reading the image file as a data URL
  reader.readAsDataURL(imageFile);
  
  // Clearing input fields after adding section
  imageInput.value = '';
  titleInput.value = '';
  fundNameInput.value = '';
  amountInput.value = '';
  reasonInput.value = '';
}