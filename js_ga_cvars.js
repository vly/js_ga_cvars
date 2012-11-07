
// IE fix from the following:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(a){"use strict";
if(this==null){throw new TypeError}var b=Object(this);var c=b.length>>>0;
if(c===0){return-1}var d=0;if(arguments.length>1){d=Number(arguments[1]);
if(d!=d){d=0}else if(d!=0&&d!=Infinity&&d!=-Infinity){
d=(d>0||-1)*Math.floor(Math.abs(d))}}if(d>=c){return-1}
var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++){
  if(e in b&&b[e]===a){return e}}return-1}}

// cookie process function from urchin.js, thanks Google.
function _uGC(a,b,c){if(!a||a==""||!b||b==""||!c||c=="")return"-";
var d,e,f,g="-";d=a.indexOf(b);f=b.indexOf("=")+1;if(d>-1){e=a.indexOf(c,d);
if(e<0){e=a.length}g=a.substring(d+f,e)}return g};



var cstVars = new function () {
    'use strict';

    // constants
    var GA_NAME = 'inj',
        ERROR = -1;

    // helper blocks
    this.clearAll = function () {
        for(var i=0; i<=5;i++) {
            _gaq.push(['inj._deleteCustomVar', i]);
        }

        console.log('All custom vars cleared.');
    }

    this.printAllVars = function () {
        console.log('GA custom vars:');
        console.log("Slot 1 key: " + retCookie());
        for(var i=1; i<=5;i++) {
            console.log(i+ ': ' + _gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(i));
        }
    }

    this.pushPage = function (demographic, page_value, page_id) {
        try {
            (pushMilestone(demographic, page_value, page_id) == ERROR) ?
                console.log('Error.') : console.log('Success.');
        }
        catch (error) {
            console.log('Error: ' + error.message);
        }
    }

    // grab cookie with customvars
    function retCookie() {
        var c = unescape(_uGC(document.cookie, '__utmv=', ';'));
        c = _uGC(c, '1=', '|').split('^')[0].split('=')[0];
        return (c == '-') ? "" : c;
    }

    function getLoc(data, string) {
        data.sort();
        return data.indexOf(string);
    }

    function insertItem(data, item) {
        data.push(item);
        data.sort();
        return data.indexOf(item);
    }

    function parseSlot(slot) {
        var current = _gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(slot);
        if(current) {
            current = current.split(', ');
            return current;
        }
        return 0;
    }

    function parseDict(slot) {
        var current = _gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(slot);
        if(current) {
            current = JSON.parse(_gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(slot));
            return current;
        }
        return 0;
    }

    /************************************
     * main functions
     ***********************************/
    // Slot 1: Set demographic information + points
    function addType(user_type, page_value) {
        var c = retCookie();
        var current = (c) ? c.split(', ') : [];
        var loc;
        var scores;
        loc = (current.indexOf(user_type) == ERROR) ? insertItem(current, user_type) : ERROR;
        scores = (loc == ERROR) ? addScore(0, page_value, 0) : addScore(loc, page_value, 1);
        _gaq.push(['inj._setCustomVar', 1, current.join(', '), scores, 1]);
        return loc;
    }

    // Slot 1: Increment engagement score
    function addScore(loc, new_value, isNew) {
        var current = parseSlot(1) || [];
        if(isNew) {
            current.splice(loc, 0, new_value);
        }
        else {
            if(current.length != 0 && current.length >= loc) {
                current[loc] = parseInt(current[loc]) + new_value;
            }
            else { 
                current.push(new_value);
            }
        }
        return current.join(', ');
    }

    // Slot 5: add page to visited list
    function addVisit(page_id) {
        var current = parseDict(5) || {};
        var confirm = 1;

        if(current[page_id]) {
            current[page_id] += 1;
            confirm = ERROR;
        }
        else {
            current[page_id] = 1;
        }
        _gaq.push(['inj._setCustomVar',5,JSON.stringify(current),JSON.stringify(current),1]);
        return confirm;
    }

    // Init: run through the actions
    function pushMilestone(demographic, page_value, page_id) {
        var check = ERROR;
        var loc = 0;
        var isNew = 1;

        check = addVisit(page_id);

        if(check != ERROR) {
            addType(demographic, page_value);
        }

        _gaq.push(['inj._trackEvent','user activity', 'status change']);

        return check;
    }
};