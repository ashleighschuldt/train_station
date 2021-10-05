//rough mockup of how the db would be if it was key value store
const db = {
    trainName1: arrival_times,
    trainName2: arrival_times
}


function fetch(key){
    return db[key];
}

function set(key, value){
    return db[key] = value;
}

function keys(){
    return Object.keys(db);
}