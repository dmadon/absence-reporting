async function queueHandler(event){
    
    event.preventDefault();

    const id = event.target.getAttribute("data-record");

    if(event.target.getAttribute('id')=="approve-btn"){
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
    }
    else if(event.target.getAttribute('id')=="deny-btn"){
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
    }  
};

// async function denyAbsence(event){
    
//     event.preventDefault();

//     id = event.target.getAttribute("data-record");

    
// };




document.querySelector('#queue-holder').addEventListener('click',queueHandler);
