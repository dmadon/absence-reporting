async function loginFormHandler(event){
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password){
        const response = await fetch('/api/users/login',{
            method:'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers:{'Content-Type':'application/json'}
        });
        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert('Invalid email address or password.');
        };
    }
    else{alert('Please enter your email address and password to log in.')};
};

async function signupFormHandler(event){
    event.preventDefault();

    var approver = ''

    if(document.querySelector('#is-approver-signup').value.trim()==0){
        approver = false
    }
    else{approver = document.querySelector('#is-approver-signup').value.trim()}

    

// IF WE NEED TO ACCEPT A NULL VALUE FOR THE APPROVER DROPDOWN BOX, 
// WE CAN USE THIS IF STATEMENT, SET THE VALUE OF 'const approver_id' to 'myApprover'
// AND REMOVE THE 'approver_id' parameter from the list of requirements on line 56
    // var myApprover = ''    
    // if(document.querySelector('#my-approver-signup').value.trim()==0){
    //     myApprover = null
    // }
    // else{myApprover = document.querySelector('#my-approver-signup').value.trim()}

    const first_name = document.querySelector('#first_name-signup').value.trim();
    const last_name = document.querySelector('#last_name-signup').value.trim();
    const is_approver = approver;
    const approver_id = document.querySelector('#my-approver-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const department_id = document.querySelector('#my-department-signup').value.trim();


    if(first_name && last_name && email && password && department_id && approver_id){
        const response = await fetch('/api/users/',{
            method:'POST',
            body: JSON.stringify({
                first_name,
                last_name,
                is_approver,
                approver_id,
                email,
                password,
                department_id,
            }),
            headers:{'Content-Type':'application/json'}
        });
        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        };
    }
    else{alert('Please complete all required fields')};
};

document.querySelector('.login-form').addEventListener('submit',loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit',signupFormHandler);