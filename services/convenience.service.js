const { getDatesInRange } = require("../utils/utils");

const axios = require("axios").default;

module.exports= {

    holidays: async (country_code, year, from, to) => {
        try {
            //Bassically returns the date version of the string while checking to
            //make sure that the current date being observed is less than or equal to the end date
            let dates = await getDatesInRange(from, to);
            let response = await axios.get(
                `${process.env.NAGER_BASE_URL}${year}/${country_code}`
            );

            dates = dates.filter((date) => {
                //returns a boolean value if the date from the API call is equal to the current date being filtered and within the time frame
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