module.exports = {

    format_date: date => {
        return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    date_correct: date => {
        const value = date.setDate(date.getDate()+1);
        return `${new Date(value).getMonth()+1}/${new Date(value).getDate()}/${new Date(value).getFullYear()}`;
    }

}