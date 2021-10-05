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
function check_list_or_single(time){
    if (time.includes(',')){
        let times = time.split(',');
        for (let i = 0; i < times.length; i++){
            if (!validate_time(times[i])){
                return false;
            }
        }
        return true;
    } else {
        return validate_time(time);
    }
}

function validate_time(time){
    let valid_hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let valid_minutes = [];
    let valid_meridiem = ['AM', 'PM'];

    for (let i = 0; i < 60; i++){
        if (i < 10){
            i = '0'+i;
        }
        valid_minutes.push(i);
    }
    if (!time.includes(':')){
        return false;
    }
    
    time = time.replace(/:/g, '');
    if (time.length < 6){
        time =  "0" + time;
    }

    let hours = time.substring(0,2);
    let minutes = parseInt(time.substring(2,4));
    let meridiem = time.substring(4,6);

    if (!valid_hours.includes(hours)){
        console.log('hrs')
        return false;
    }
    
    if (minutes >= 60){
        console.log('minutes')
        return false;
    }
    if (!valid_meridiem.includes(meridiem)){
        console.log('meri')
        return false;
    }

    return true;
}

module.exports = { convert_time_to_number, convert_time_to_text, convert_text_to_time, validate_time, check_list_or_single };