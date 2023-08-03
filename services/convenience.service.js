const { getDatesInRange } = require("../utils/utils");

const axios = require("axios").default;

module.exports= {

    holidays: async (country_code, year, from, to) => {
        try {
            let dates = await getDatesInRange(from, to);
            let response = await axios.get(
                `${process.env.NAGER_BASE_URL}${year}/${country_code}`
            );

            dates = dates.filter((date) => {
                return !response.some((gottenDate) => {
                    return (
                        new Date(gottenDate.date).getTime() == date.getTime() && (date.getTime() < new Date(from).getTime() || date.getTime() > new Date(to).getTime())
                    );
                });
            });

            return { country: country_code, available_dates: dates };
        } catch (e) {
            return { country: country_code, available_dates: e.message };

        }
    }
}