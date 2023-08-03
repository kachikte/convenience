const { holidays } = require("../services/convenience.service");

module.exports = {
    availability: async (req, res) => {
        let countries  = req.body.countries;

        let promises = [];

        //Run a query for each country using the start and end date to check for the possible holidays
        // which would be returned in the promises array
        countries.forEach(country => {
            let from = new Date(country.from).getFullYear();
            let to = new Date(country.to).getFullYear();

            
            promises.push(
                holidays(country.country_code, from, country.from, country.to)
            );

            //If the start date is different from the end date, it also adds the endate
            //else if only adds the start date above 
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