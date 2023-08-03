const { holidays } = require("../services/convenience.service");

module.exports = {
    availability: async (req, res) => {
        let countries  = req.body.countries;

        let promises = [];

        countries.forEach(country => {
            let from = new Date(country.from).getFullYear();
            let to = new Date(country.to).getFullYear();

            promises.push(
                holidays(country.country_code, from, country.from, country.to)
            );

            if (from != to) {
                promises.push(
                    holidays(country.country_code, to, country.from, country.to)
                );
            }
        });

        let result = await Promise.all(promises);
        res.send(result)
    }
}