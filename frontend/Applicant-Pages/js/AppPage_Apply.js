document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfEmbed = document.getElementById('pdfEmbed');
  
    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function (e) {
          pdfEmbed.src = e.target.result;
          pdfViewer.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a PDF file.');
      }
    });
  });

const messageTextarea = document.getElementById('message');
const wordCount = document.getElementById('wordCount');


messageTextarea.addEventListener('input', function() {
  
    const words = this.value.trim().split(/\s+/);
    
    // Update the word count paragraph not working yet
    wordCount.textContent = `Word count: ${words.length}/100`;

    // Check if the number of words exceeds 100 and truncate the input if needed
    if (words.length > 100) {
        this.value = words.slice(0, 100).join(' ');
        wordCount.textContent = 'Word count: 100/100';
    }
});
