async function queueHandler(event){
    
    event.preventDefault();

    const id = event.target.getAttribute("data-record");
    const username = event.target.getAttribute("data-username");
    const user_email = event.target.getAttribute("data-user-email");
    const stored_start_date = event.target.getAttribute("data-start-date");
    const start_date = `${new Date(stored_start_date).getMonth()+1}/${new Date(stored_start_date).getDate()}/${new Date(stored_start_date).getFullYear()}`;
    const stored_end_date = event.target.getAttribute("data-end-date");
    const end_date = `${new Date(stored_end_date).getMonth()+1}/${new Date(stored_end_date).getDate()}/${new Date(stored_end_date).getFullYear()}`;
    const leave_type = event.target.getAttribute("data-leave-type");
    const approvername = event.target.getAttribute("data-approvername");
    const absence_hours = event.target.getAttribute("data-absence-hours")


    if(event.target.getAttribute('id')=="approve-btn"){
        const response = await fetch (`/api/absences/approval/${id}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'}
        })
        if (response.ok){
            document.location.reload();

             // SEND EMAIL TO USER
             const mail = await fetch('/api/mail/approved',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username,
                    user_email,
                    start_date,
                    end_date,
                    leave_type,
                    approvername,
                    absence_hours
                })
            })
        }
        else{
            alert(response.statusText);
        };
    }
    else if(event.target.getAttribute('id')=="deny-btn"){
        const response = await fetch (`/api/absences/denial/${id}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'}
        })
        if (response.ok){
            document.location.reload();

            // SEND EMAIL TO USER
            const mail = await fetch('/api/mail/denied',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    username,
                    user_email,
                    start_date,
                    end_date,
                    leave_type,
                    approvername,
                    absence_hours
                })
            })
        }
        else{
            alert(response.statusText);
        };
    }  
};





document.querySelector('#queue-holder').addEventListener('click',queueHandler);
