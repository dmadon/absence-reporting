async function approveAbsence(event){
    
    event.preventDefault();

    const id = event.target.getAttribute("data-record");

    const response = await fetch (`/api/absences/approval/${id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'}
    })
    if (response.ok){
        document.location.reload();
    }
    else{
        alert(response.statusText);
    };
};

async function denyAbsence(event){
    
    event.preventDefault();

    id = event.target.getAttribute("data-record");

    const response = await fetch (`/api/absences/denial/${id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'}
    })
    if (response.ok){
        document.location.reload();
    }
    else{
        alert(response.statusText);
    };
};




document.querySelector('#approve-btn').addEventListener('click',approveAbsence);
document.querySelector('#deny-btn').addEventListener('click',denyAbsence);