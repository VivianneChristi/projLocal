const locationModel = require('../model/locationModel');

exports.getAllLocation = async (req, res) => {
    try {
        const location = await locationModel.getAllLocation();
        res.render("listLocation", { location: location });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
};

exports.getContact = async (req, res) => {
    try {
        res.render("contact");
    } catch (err) {
        res.status(500).json({ error: err.toString() })
    }
};
exports.getHome = async (req, res) => {
    try {
        res.render("home");
    } catch (err) {
        res.status(500).json({ error: err.toString() })
    }
};
exports.getForm = async (req, res) => {
    try {
        res.render("form");
    } catch (err) {
        res.status(500).json({ error: err.toString() })
    }
};
exports.newContact = async (req, res) => {
    try {
        const { nome, sigla, bairro } = req.body;


        const existingLocation = await locationModel.getLocationByName(nome);
        if (existingLocation) {

            return res.status(400).send('Local já cadastrado');
        }

        await locationModel.createLocation(nome, sigla, bairro);


        res.send('Local cadastrado com sucesso!');
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
};
