let userData = {};

async function login (loginUser: object) {
    const res = await fetch('https://raddxcap-backend.azurewebsites.net/user/Login', {
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
    return data;
}

async function getLoggedInUserData(username: string){
    let res = await fetch(`https://raddxcap-backend.azurewebsites.net/user/GetUserByUsername/${username}`);
    let data = await res.json();
    userData = data;
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
    const res = await fetch('https://raddxcap-backend.azurewebsites.net/item/AddItem', {
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
    return data;
}

async function getAllItems(){
    let res = await fetch('https://raddxcap-backend.azurewebsites.net/item/GetAllItems');
    let data = await res.json();
    return data;
}

async function getPublishedItems(){
    let res = await fetch('https://raddxcap-backend.azurewebsites.net/item/GetPublishedItems');
    let data = await res.json();
    return data;
}

async function updateItem(item: any){
    const res = await fetch('https://raddxcap-backend.azurewebsites.net/item/UpdateItem', {
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
    return data;
}

async function deleteItem(item: any){
    const res = await fetch('https://raddxcap-backend.azurewebsites.net/item/DeleteItem', {
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
    return data;
}


export { login, getLoggedInUserData, checkToken, loggedInData, addItem, getAllItems, getPublishedItems, updateItem, deleteItem }