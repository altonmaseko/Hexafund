const { asyncWrapper } = require("../../middleware");
const { Application } = require("../../models");

const deleteApplication = asyncWrapper(async (req, res) => {

    const { application_id } = req.params;

    if (!application_id) {
        res.status(400).json({ message: "Please include application_id in url. e.g: api/v1/application/example_id", status: 400 });
        return;
    }

    await Application.deleteOne({ _id: application_id });

    res.status(200).json({ message: "Successfully deleted", success: true });
});

module.exports = deleteApplication;