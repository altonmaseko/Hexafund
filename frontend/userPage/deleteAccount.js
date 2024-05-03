

document.querySelector(".deleteProfile").addEventListener("click", async ()=>{
    window.location.href = "/"
    try {
        console.log("delete request")
        await axios.delete("/api/v1/delete")
        alert("Account Deleted Successfully")
    } catch (error) {
        alert("Sorry, couldnt delete your account. We promise this isnt intentional :) Please try again later!")
        window.location.href = "/"
    }
    window.location.href = "/"
})
