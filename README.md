# Funding Requests Management Website 

# About
This project aims to equip the organisations with a central place to advertise all their funding opportunities and manage all the applications they get for funding. This project should cater for at least three types of funding opportunities, namely: Educational (bursaries and scholarships), business, and events.

# Users
- Funding Managers:
    - Post advertisements about available funding opportunities from different companies.
    - Those opportunities include: Bursaries/Scholarships, Funds for Events, Funds for Business.
    - Needs permission from an admin to post ads
- Applicants:
    - Anyone who visits the website, creates a profile and seeks money for studying, their event, or their business.
- Platform Admins:
    - Approves a funding manager before they are fully registered. An admin can also view and delete other users, block users, manage access, change permissions etc. 

# Features
- Funding Opportunities Ads
- Applications to Funding Opportunities
- Funding review
- Budgeting (Tracking/Changing the total amount of money available in a fund)
- Reporting (Reports regarding application data and fund data can be generated and downloaded as .csv and .pdf files)

# Running App Locally ***
- Install npm, mongodb, MongoDB compass app on computer.
- clone Github Repository.
- Open the local folder in vs code.
- Add a .env file in root, with the following variables (the variable values dont need quotes, and no semicolon is needed at end of line):
    - PORT=3000
    - ACCESS_TOKEN_SECRET=aca25f0df19dc5bae1a0b0a97d59381bc7b746e2cdc15545c6dcbc076009a6a6aa00ea31a0bdfc9a2b9a3b55773e58c80128
    - REFRESH_TOKEN_SECRET=e86db6e7af9379d2ef5b88b108167f3da65e2cd49f1f1d16c8a93541cf63edddcbea34744e2365713692c1229c9acec5f331
    - CONNECTION_URI=mongodb://localhost:27017/FundingWebsite

- Make sure local mongodb service is running (it should start itself after install). When you run MongoDB Compass app, you should be met with a dialog to connect to local running mongodb at URI: mongodb://localhost:27017.
    - If URI displayed in mongoDB Compass app is different, change CONNECTION_URI in .env file to what you see, then follow with /FundingWebsite. However it shouldnt be.

- In vs code terminal, type 'npm install' [This installs all modules needed. They are not pushed to github because they are large.]
- From root of project, navigate to 'frontend' -> 'External_Modules' -> 'axios.min.js', go to end of file, uncomment the local baseURL for axios and comment out the production URL line.
    - This determines where axios requests (get,post,put,delete) are sent in axios. If you use production baseURL, online mongodb database will be modified, instead of local one.
- In vs code terminal, type 'npm start' or 'npm run dev' [This starts application on port 3000.]

- Users of website cannot create an admin through website. To create an admin:
    - Install postman.
    - Make sure website is running locally [type 'npm run dev' in terminal of vs code]. In postman, send a POST request to http://localhost:3000/register with the following json data in body:
"
{
"name": "admin",
"password": "Admin123##",
"email": "admin@gmail.com",
"role": "Platform Admin"
}
"

    - You can use any name, password or email, but role SHOULD be "Platform Admin".
    - Now you can login with admin email and password through local running website, and you will be recognized as an admin and sent to Admin Home Page, where you can manage all Funding Managers, Applicants and opportunities posted.
- Registering an admin is only thing you need to do in postman.

- For other users, register normally as a Funding Manager or as an Applicant through locally running website.
- To see database, run MongoDB Compass app and click green connect button. Then you will see FundingWebsite database.
