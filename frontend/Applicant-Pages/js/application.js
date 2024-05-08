


const submitButton = document.getElementById('submitButton');
const viewFile = document.getElementById('viewFile');
const fileUpload = document.getElementById('fileInput');

const pdfIframe = document.getElementById("pdfIframe");

let base64;

submitButton.addEventListener('click', async () => {

    const selectedFile = fileUpload.files[0];

    if (!selectedFile || selectedFile.type !== 'application/pdf') {
        alert('Please select a PDF file!');
        return;
    }

    // FileReader function for read the file.
    var fileReader = new FileReader();

    // Convert data to base64
    fileReader.readAsDataURL(selectedFile);

    // Onload of file read the file content
    fileReader.onload = function (fileLoadedEvent) {
        base64 = fileLoadedEvent.target.result;

        console.log(base64);
        pdfIframe.setAttribute("src", base64);

        // SEND THE AXIOS REQUEST ========================

        const application = {
            applicant_email: "example@gmail.com",
            reason: "reason",
            contact_number: "0123456789",
            cv_data: base64
        }

        try {
            axios.post("api/v1/application", application);
        } catch (error) {
            alert("Sorry could not upload the file");
        }

        // SEND THE AXIOS REQUEST ==========================

    };


    // console.log(selectedFile);


});


viewFile.addEventListener("click", async (event) => {
    // try {
    //     const response = await axios.get(`/api/v1/application/663b7f90be5046f853153c64`);
    //     console.log(response);
    // } catch (error) {
    //     alert(`error: ${error.message}`);
    // }
})