async function changeAbsenceHandler(event){

    event.preventDefault();

    const id = event.target.getAttribute("data-record");
    const approver_email = event.target.getAttribute("data-approver-email");
    const stored_start_date = event.target.getAttribute("data-start-date");
    const start_date = `${new Date(stored_start_date).getMonth()+1}/${new Date(stored_start_date).getDate()}/${new Date(stored_start_date).getFullYear()}`;
    const stored_end_date = event.target.getAttribute("data-end-date");
    const end_date = `${new Date(stored_end_date).getMonth()+1}/${new Date(stored_end_date).getDate()}/${new Date(stored_end_date).getFullYear()}`;
    const leave_type = event.target.getAttribute("data-leave-type");
    const absence_hours = event.target.getAttribute("data-absence-hours");
    const user_id = event.target.getAttribute("data-user-id")
    const username = await fetch (`/api/users/${user_id}`).then(response => response.json()).then(value => {return `${value.first_name} ${value.last_name}`});

    if(event.target.getAttribute('id')=="delete-btn"){   
        const response = await fetch (`/api/absences/${id}`,{
            method:'DELETE'
        })
        if(response.ok){
            document.location.reload();

            // SEND EMAIL TO USER'S APPROVER
            const mail = await fetch('/api/mail/delete',{
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
            alert(response.statusText);
        };
    }
    else if(event.target.getAttribute('id')=="edit-btn"){
        document.location.replace(`/dashboard/edit-absence/${id}`)
    }

};

document.querySelector('#absences-holder').addEventListener('click',changeAbsenceHandler);