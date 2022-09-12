async function saveNewAbsence(event){
    event.preventDefault();
    const username = event.target.getAttribute("data-username");
    const approver_email = event.target.getAttribute("data-approver-email");
    const new_start_date = document.querySelector('#new-start-date').value.trim();
    const start_date = `${new Date(new_start_date).getMonth()+1}/${new Date(new_start_date).getDate()}/${new Date(new_start_date).getFullYear()}`
    const new_end_date = document.querySelector('#new-end-date').value.trim();
    const end_date = `${new Date(new_end_date).getMonth()+1}/${new Date(new_end_date).getDate()}/${new Date(new_end_date).getFullYear()}`
    const leave_type_id = document.querySelector('#new-leave').value.trim();
    const leave_type = await fetch (`/api/leave/${leave_type_id}`).then(response => response.json()).then(value => {return value.leave_type});

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
                    end_date,
                    leave_type,
                    absence_hours
                })
            })
        }
        else{
            alert(response.statusText)
        };
    };
};

document.querySelector('#save-new-btn').addEventListener('click',saveNewAbsence);