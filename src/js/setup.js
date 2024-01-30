
    function setup(setup) {
        if (setup == true) {
            var setupmyModal = document.getElementById('setupmyModal');
            setupmyModal.style.display = 'block';
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var modal = document.getElementById('setupmyModal');

        window.addEventListener('click', function (event) {
            if (setupCompleted == true) {
                if (event.target === modal) {
                    checkIfSetupCompleted()
                }
            }
        });
    });

    var setupUserId = document.getElementById('setupUserId')
    var setupUsername = document.getElementById('setupUsername')
    var setupSubmit = document.getElementById('submitUserId')
    var setupSubmit2 = document.getElementById('setupSubmit')
    var setupsubmitUserName = document.getElementById('submitUserName')

    var validUserId;
    var validUserName;

    var SubmittedUserId;
    var SubmittedUserName;

    document.addEventListener('DOMContentLoaded', function () {
        setupSubmit.addEventListener('click', async function (event) {
            var userId = setupUserId.value;
            console.log(userId)

            validUserId = await checkValidUserId(userId)

            if (validUserId == true) {
                setupSubmit.classList.toggle('setup-checked');  
                setupUserId.classList.toggle('setup-checked');  
                SubmittedUserId = userId
                checkIfSetupCompleted()
            } else {
                setupSubmit.classList.toggle('setup-failed');  
                setupUserId.classList.toggle('setup-failed');
            
                // Use setTimeout with a callback function
                setTimeout(() => {
                    setupSubmit.classList.remove('setup-failed');  
                    setupUserId.classList.remove('setup-failed');
                }, 5000);
            }
        })
        
        setupsubmitUserName.addEventListener('click', async function (event) {
            var userName = setupUsername.value;
            console.log(userName)

            validUserName = await checkValidUserName(userName)

            if (validUserName == true) {
                setupsubmitUserName.classList.toggle('setup-checked');  
                setupUsername.classList.toggle('setup-checked');  
                SubmittedUserName = userName
                checkIfSetupCompleted()
            } else {
                setupsubmitUserName.classList.toggle('setup-failed');  
                setupUsername.classList.toggle('setup-failed');
            
                setTimeout(() => {
                    setupsubmitUserName.classList.remove('setup-failed');  
                    setupUsername.classList.remove('setup-failed');
                }, 5000);
            }
            
        })

        setupSubmit2.addEventListener('click', async function (event) {
            if (validUserId && validUserName) {

            }
        })
    });

    async function checkValidUserId(userId){
        const apiUrl = `http://${server}:3001/ValidID`;
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userId': userId
            }
        };

        const response = await fetch(apiUrl, fetchOptions);

        if (response.ok) {
            const responseData = await response.json();
            return responseData.ValidUser;
        } else {
            console.error('Failed to fetch data:', response.statusText);
            return null;
        }
    }

    async function checkValidUserName(userName) {
        const apiUrl = `http://${server}:3001/ValidUsername`;
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userName': userName
            }
        };

        try {
            const response = await fetch(apiUrl, fetchOptions);

            if (response.ok) {
                const responseData = await response.json();
                return responseData.ValidUser;
            } else {
                console.error('Failed to fetch data:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error during fetch:', error.message);
            return null;
        }
    }

    async function checkIfSetupCompleted() {
        if (validUserId && validUserName) {
            const apiUrl = `http://${server}:3001/SetupCompleted`;
            const fetchOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userName': SubmittedUserName,
                    'userId': SubmittedUserId,
                    'token': window.token
                }
            };
        
            try {
                const response = await fetch(apiUrl, fetchOptions);
        
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.success)
                    if (responseData.success) {
                        setupmyModal.classList.toggle('setup-completed');

                        setTimeout(() => {
                            setupmyModal.style.display = "none";
                        }, 500);                    }
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error.message);
                return null;
            }
        }
    }

    function checkToken() {
        if (window.token === undefined) {
            setTimeout(() => {
                checkToken();
            }, 100);
        } else {
            console.log('Token is not undefined:', window.token);
        }
    }

    checkToken();
    
    function checkSetup() {
        if (window.setupneeded === undefined) {
            setTimeout(() => {
                checkSetup();
            }, 100);
        } else {
            setup(window.setupneeded);
        }
    }
    
    checkSetup();
    