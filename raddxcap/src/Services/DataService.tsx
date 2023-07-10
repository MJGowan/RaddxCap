let userData = {};

async function createAccount(createdUser: string){
    const res = await fetch('https://raddxcapbackend.azurewebsites.net/user/createAccount', {
        method: "POST",
        headers: {
            'Content-Type':"application/json"
        },
        body:JSON.stringify(createdUser)
    });
    if(!res.ok){
        const message = `An Error has Occurred ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}

async function login (loginUser: object) {
    const res = await fetch('https://raddxcapbackend.azurewebsites.net/user/Login', {
        method: "POST",
        headers: {
            'Content-Type':"application/json"
        },
        body:JSON.stringify(loginUser)
    });
    if(!res.ok){
        const message = `An Error has Occurred ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}

async function getLoggedInUserData(username: string){
    let res = await fetch(`https://raddxcapbackend.azurewebsites.net/user/GetUserByUsername/${username}`);
    let data = await res.json();
    userData = data;
    console.log(userData);
    return userData;
}

function checkToken(){
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null){
        result = true;
    }
    return result;
}

function loggedInData(){
    return userData;
}

async function addItem(item: any){
    const res = await fetch('https://raddxcapbackend.azurewebsites.net/item/AddItem', {
        method: "POST",
        headers: {
            'Content-Type':"application/json"
        },
        body:JSON.stringify(item)
    });
    if(!res.ok){
        const message = `An Error has Occurred ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}

async function getAllItems(){
    let res = await fetch('https://raddxcapbackend.azurewebsites.net/item/GetAllItems');
    let data = await res.json();
    return data;
}

async function getPublishedItems(){
    let res = await fetch('https://raddxcapbackend.azurewebsites.net/item/GetPublishedItems');
    let data = await res.json();
    return data;
}

async function updateItem(item: any){
    const res = await fetch('https://raddxcapbackend.azurewebsites.net/item/UpdateItem', {
        method: "POST",
        headers: {
            'Content-Type':"application/json"
        },
        body:JSON.stringify(item)
    });
    if(!res.ok){
        const message = `An Error has Occurred ${res.status}`;
        throw new Error(message);
    }
    let data = await res.json();
    console.log(data);
    return data;
}


export { createAccount, login, getLoggedInUserData, checkToken, loggedInData, addItem, getAllItems, getPublishedItems, updateItem }