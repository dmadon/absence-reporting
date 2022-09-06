async function saveNewAbsence(event){
    event.preventDefault();

    const start_date = document.querySelector('#new-start-date').value.trim();
    const end_date = document.querySelector('#new-end-date').value.trim();
    const leave_type_id = document.querySelector('#new-leave').value.trim();
    const absence_hours = document.querySelector('#new-hours').value.trim();

    if(!start_date||!end_date||!leave_type_id||!absence_hours){
        alert('Please complete all form fields');
    }
    else{
        const response = await fetch('/api/absences',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                start_date,
                end_date,
                leave_type_id,
                absence_hours
            })
        })
        if(response.ok){
            alert('response is ok')
            // document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText)
        };
    };
};

document.querySelector('#save-new-btn').addEventListener('click',saveNewAbsence);