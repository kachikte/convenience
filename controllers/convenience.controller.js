module.exports = {
    availability: async (req, res) => {
        let countries  = req.body.countries;

        let promises = [];

        countries.array.forEach(country => {
            let from = new Date(country.from).getFullYear();
            let to = new Date(country.to).getFullYear();

            promises.push();

            if (from != to) {
                promises.push();
            }
        });

        let result = await Promise.all(promises);
        res.send(result)
    }
}