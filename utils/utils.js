module.exports = {
    getDatesInRange: async (startDate, endDate) => {
        const dates = [];
        const currentDate = new Date(startDate);
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }
}