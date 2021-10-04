const chai = require('chai');
const assert = chai.assert;

describe('Time Entered', function(){
    it('should be a string', function(){
        let string = '9:53PM';
        assert.typeOf(string, 'string');
    });
    
    it('should have a colon', function(){
        let time = '9:53PM';
        assert.isTrue(time.includes(':'));
    });

    it('should be at least 6 characters', function(){
        let time = '9:53PM';
        assert.isAtLeast(time.length, 6);
    });

    it('should be a maximum of 7 characters', function(){
        let time = "9:53PM";
        assert.isAtMost(time.length, 7);
    })
    it('should have valid minutes', function(){
        let time = "9:53PM";
        
        time = time.replace(/:/g, '');
        if (time.length < 6){
            time =  "0" + time;
        }
        let minutes = parseInt(time.substring(2,4));
        assert.isAtMost(minutes, 59);

    });

    it('should have valid hours', function(){
        let time = "9:53PM";
        time = time.replace(/:/g, '');
        if (time.length < 6){
            time =  "0" + time;
        }

        let hours = time.substring(0,2);
        let valid_hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        assert.isTrue(valid_hours.includes(hours));
    });
});