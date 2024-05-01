document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.querySelector(".sendButton");

    sendButton.addEventListener("click", function() {
        const fundTitle = document.getElementById("fundTitle").value;
        const companyName = document.getElementById("companyName").value;
        const category = document.getElementById("category").value;
        const amount = document.getElementById("amount").value;
        const count = document.getElementById("count").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const description = document.getElementById("description").value;

        if (!fundTitle || !companyName || category === "" || !amount || !count || !expiryDate || !description) {
            alert("Please fill in all fields.");
        }
        else{
            alert("Ad has been submitted")
        }
    });
});
