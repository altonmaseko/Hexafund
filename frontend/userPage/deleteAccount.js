

const userName = document.querySelector("#userName")
const userEmail = document.querySelector("#userEmail")

document.querySelector(".deleteProfile").addEventListener("click", ()=>{
    try {
        console.log("delete request")
        axios.delete("/api/v1/delete")
        window.location.href = "/"
    } catch (error) {
        alert("Sorry, couldnt delete your account. We promise this isnt intentional :) Please try again later!")
    }
})
