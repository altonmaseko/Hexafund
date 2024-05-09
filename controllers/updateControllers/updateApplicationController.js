const { asyncWrapper } = require("../../middleware");
const { Application } = require("../../models");

const updateApplication = asyncWrapper(async (req, res) => {

    const { application_id } = req.params;
    const body = req.body;

    if (!application_id) {
        res.status(400).json({ message: "Please include application_id in url. e.g: api/v1/application/example_id", status: 400 });
        return;
    }

    if (Object.keys(body).length <= 0) {
        res.status(400).json({ message: "Please include a body of the properties you want to modify", status: 400 });
        return;
    }

    await Application.updateOne({ _id: application_id }, { $set: body });

    res.status(200).json({ message: "Successfully updated", success: true, data: body });
});

module.exports = updateApplication;