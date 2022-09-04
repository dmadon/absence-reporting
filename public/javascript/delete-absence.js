async function deleteAbsenceHandler(event){

    event.preventDefault();

    const id = event.target.getAttribute("data-record");

    const response = await fetch (`/api/absences/${id}`,{
        method:'DELETE'
    })
    if(response.ok){
        document.location.reload();
    }
    else{
        alert(response.statusText);
    };
};

document.querySelector('#delete-btn').addEventListener('click',deleteAbsenceHandler);