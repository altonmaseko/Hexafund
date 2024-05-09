
document.querySelector('.ViewAttachment').addEventListener('click', function() {
    document.body.classList.add('fullscreen');
    var pdfFrame = document.querySelector('.pdf');
    pdfFrame.style.width = '95%';
    pdfFrame.style.height = '90vh';
});

document.body.addEventListener('click', function(event) {
    if (!event.target.classList.contains('ViewAttachment')) {
        document.body.classList.remove('fullscreen');
        var pdfFrame = document.querySelector('.pdf');
        pdfFrame.style.width = '800px'; 
        pdfFrame.style.height = '500px'; 
    }
});