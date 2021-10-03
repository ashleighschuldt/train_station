function convert_time_to_number (time){
    time = time.replace(/:/g, '');
    if (time.length < 6){
        time = "0"+time;
    }

    let hours = time.substring(0,2);
    let minutes = time.substring(2,4);
    let meridiem = time.substring(4,6);

    if (meridiem === 'AM'){
        time = hours+minutes+'00';
    } else {
        hours = parseInt(hours)+12;
        hours = hours.toString();
        time = hours+minutes+'00';
    }

    return time;
}

function convert_time_to_text (time){
    let hours = time.substring(0,2);
    let minutes = time.substring(3,5);
    let meridiem = ' AM';
    if (hours > 12){
        hours = hours - 12;
        meridiem = ' PM';
    }
    time = hours+':'+minutes+meridiem;

    return time;
}

function convert_text_to_time (time){
    time = time.replace(':', '');
    if (time.length < 6){
        time =  "0" + time;
    }

    let hours = time.substring(0,2);
    let minutes = time.substring(2,4);
    let meridiem = time.substring(4,6);

    if (meridiem === 'AM'){
        time = hours+':'+minutes+':00';
    } else {
        hours = parseInt(hours)+12;
        time = hours+':'+minutes+':00';
    }
    return time;
}

module.exports = { convert_time_to_number, convert_time_to_text, convert_text_to_time };