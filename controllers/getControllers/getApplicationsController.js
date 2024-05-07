const { asyncWrapper } = require("../../middleware");
const { Application } = require("../../models");

const getApplications = asyncWrapper(async (req, res) => {

    let applications = await Application.find({});

    const query = req.query; // when browser url is ...?property=value&property2=value
    
    console.log(query);

    if (Object.values(query).length <= 0) {
        res.status(200).json( applications );
        return;
    }

    for(let key in query) {
        applications = applications.filter((application) => {
            if (key.includes(".")) {
                const keys = key.split(".");
                console.log(keys);

                if (application[keys[0]][keys[1]]?.toString() == query[key]) {
                    return application;
                }
            }
            if (application[key]?.toString() === query[key]) {
                return application;
            }
        });
    }

    res.status(200).json( applications );
});

module.exports = getApplications;