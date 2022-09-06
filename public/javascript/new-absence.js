async function newAbsenceHandler(event){
    event.preventDefault();
    document.location.replace('/dashboard/new-absence')
};

document.querySelector('#new-absence-btn').addEventListener('click',newAbsenceHandler);