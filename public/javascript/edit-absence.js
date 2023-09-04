async function saveChanges(event){
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    
    // THESE ARE THE UPDATES THE USER HAS MADE SO THAT WE CAN UPDATE THE ABSENCE RECORD IN THE DATABASE 
    // AND SEND IT IN THE EMAIL TO THE APPROVER
    const start_date = document.querySelector('#edit-start-date').value.trim();
    const end_date =  document.querySelector('#edit-end-date').value.trim();
    const leave_type_id = document.querySelector('#edit-leave').value.trim();
    const leave_type = await fetch (`/api/leave/${leave_type_id}`).then(response => response.json()).then(value => {return value.leave_type});
    const absence_hours = document.querySelector('#edit-hours').value.trim();
    
    // THIS IS THE ORIGINAL ABSENCE DATA SO THAT WE CAN SEND IT IN THE EMAIL TO THE APPROVER
    const orig_start_date = event.target.getAttribute("data-orig-start");
    const orig_end_date = event.target.getAttribute("data-orig-end");
    const orig_leave_type = event.target.getAttribute("data-orig-leave-type");
    const orig_absence_hours = event.target.getAttribute("data-orig-absence-hours");

    // THIS INFORMATION IS NEEDED FOR THE EMAIL 
    const username = event.target.getAttribute("data-username");
    const approver_email = event.target.getAttribute("data-approver-email");

    if(!start_date||!end_date||!leave_type_id||!absence_hours){
        alert('Please complete all form fields');
    }
    else{
        // UPDATE THE ABSENCE RECORD IN THE DATABASE
        const response = await fetch (`/api/absences/${id}`,{
            method:'PUT',
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
              const mail = await fetch('/api/mail/update',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username,
                    approver_email,
                    start_date,
                    end_date,
                    leave_type,
                    absence_hours,
                    orig_start_date,
                    orig_end_date,
                    orig_leave_type,
                    orig_absence_hours
                })
            })
        }
        else{
            alert(response.statusText)
        };
    };
};

document.querySelector('#save-changes-btn').addEventListener('click',saveChanges);