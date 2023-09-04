const dayjs = require('dayjs');

module.exports = {

    format_date: date => {
        return dayjs(date).format("M/D/YYYY");
    },

    add_day: date => {
        return dayjs(date).add(1,'day').format("YYYY-MM-DD");
    },

    datepicker_correction: date => {
        return dayjs(date).add(1,'day').format("YYYY-MM-DD");
    }
};