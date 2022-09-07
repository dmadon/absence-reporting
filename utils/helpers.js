module.exports = {

    format_date: date => {
        return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    date_correct: date => {
        const value = date.setDate(date.getDate()+1);
        return `${new Date(value).getMonth()+1}/${new Date(value).getDate()}/${new Date(value).getFullYear()}`;
    },

    date_input_format: date => {

        const value = date.setDate(date.getDate()+1);

        var month = ''

        if(new Date(value).getMonth()<9){
            month = `0${new Date(value).getMonth()+1}`
        }
        else{
            month = `${new Date(value).getMonth()+1}`
        };

        var day = ''
        if(new Date(value).getDate()<10){
            day = `0${new Date(value).getDate()}`
        }
        else{
            day = `${new Date(value).getDate()}`
        }
        
       
        
        return `${new Date(date).getFullYear()}-${month}-${day}`;
    },

}