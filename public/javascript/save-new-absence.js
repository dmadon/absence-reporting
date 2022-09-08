async function saveNewAbsence(event){
    event.preventDefault();
    const username = event.target.getAttribute("data-username");
    const id = event.target.getAttribute("data-user-id");
    const approver_email = event.target.getAttribute("data-approver-email");
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
            document.location.replace('/dashboard');

            // SEND EMAIL TO USER'S APPROVER
            const mail = await fetch('/api/mail/new',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username,
                    approver_email,
                    start_date,
                    end_date
                })
            })
        }

        else{
            alert(response.statusText)
        };
    };
};

document.querySelector('#save-new-btn').addEventListener('click',saveNewAbsence);