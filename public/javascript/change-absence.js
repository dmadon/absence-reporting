async function changeAbsenceHandler(event){

    event.preventDefault();

    const id = event.target.getAttribute("data-record");

    if(event.target.getAttribute('id')=="delete-btn"){   
        const response = await fetch (`/api/absences/${id}`,{
            method:'DELETE'
        })
        if(response.ok){
            document.location.reload();
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