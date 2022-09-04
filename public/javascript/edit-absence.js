async function saveChanges(event){
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    const start_date = document.querySelector('#edit-start-date').value.trim();
    const end_date = document.querySelector('#edit-end-date').value.trim();
    const leave_type_id = document.querySelector('#edit-leave').value.trim();
    const absence_hours = document.querySelector('#edit-hours').value.trim();

    const response = await fetch (`/api/absences/${id}`,{
        method:'PUT',
        body:JSON.stringify({
            start_date,
            end_date,
            leave_type_id,
            absence_hours
        }),
        headers:{'Content-Type':'application/json'}
    })
    if(response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText)
    };
};

document.querySelector('#save-changes-btn').addEventListener('click',saveChanges);