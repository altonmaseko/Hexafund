
// how the funding opportunity object looks like:
const obj = 
{
    title: "Education Scholarship Fund",
    company_name: "ABC Education Foundation",
    funding_manager_email: "scholarships@abcfoundation.org",
    type: "Educational",
    admin_status: "Pending",
    funding_opportunity_id: "663256055a09d2d9dac9d857"
}

// ***GET
// These gets return an array of objects with the properties specified in query_params
query_params = "?funding_opportunity_id=663256055a09d2d9dac9d857";
axios.get("/api/v1/funding-opportunities" + query_params)

// another get example
const query_params = "?title=Education Scholarship Fund&admin_status=Pending";
axios.get("/api/v1/funding-opportunities" + query_params)

// another get example
axios.get("/api/v1/funding-opportunities") // This gets ALL funding opportunities

// ***POST (CREATE)
const body = {
    title: "Education Scholarship Fund",
    company_name: "ABC Education Foundation",
    funding_manager_email: "scholarships@abcfoundation.org",
    type: "Educational",
    admin_status: "Pending",
}
axios.post("/api/v1/", body)

// ***PUT (UPDATE)
const updateProperties = {
    company_name: "ABC University Foundation",
    admin_status: "Accepted"  // Other values: Rejected, Approved, Pending, Accepted
}
// This Put request updates the funding opportunity with id = 663256055a09d2d9dac9d857
axios.put("/funding-opportunities/663256055a09d2d9dac9d857", updateProperties)

// ***DELETE
// This delete request deletes a funding opportunity with id = 663256055a09d2d9dac9d857
axios.delete("/funding-opportunities/663256055a09d2d9dac9d857")


// IMPORTANT:
// Lastly when making requests, ALWAYS use try catch,
try {
    // ***When no error, data i send back is stored in response.data !!!!!
    const response = await axios.post("/api/v1/", body);
    const dataSentBackByBackendDev = response.data;
} catch (error) {
    // ***When there is error, data i send back is stored in error.response.data !!!!!!!
    // I send back { message: '...', status: 404 }
    const dataSentBackByBackendDev = error.response.data;
    console.log(dataSentBackByBackendDev);
}

// Note: When you get funding opportunitie(s), so that you can dynamically load them,
// the funding_opportunity_id will be returned as well. So you can store this value in an html
// element like: htmlElement.setAttribute("funding_opportunity_id", id)

// And when admin clicks delete for example, you can get the id: 
const fundingToDeleteID = htmlElement.getAttribute("funding_opportunity_id")
axios.delete(`/funding-opportunities/${fundingToDeleteID}`)