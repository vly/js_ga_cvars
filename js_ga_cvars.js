/*
  slot 1: ['type1','type2','type3']
  slot 2: [33, 12, 4]
  slot 3: ['s33333', '093333', ['nx9123','nx891283']]
  slot 4: //touchpoints
  slot 5: {'1':1, '2':3}

Notes:
  - slot 1 always sorted
  - slot 2 follows slot 1 positions
  - some milestones can have multiple areas that can increment all values
    e.g. accommodation, life on campus etc.
  - slot 5 increments even if already exists, though slot 2 doesn't
  - slot 3 follows slot1 layout and goes 2d if entry already exists.
*/


// IE fix from the following:
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(a){"use strict";
if(this==null){throw new TypeError}var b=Object(this);var c=b.length>>>0;
if(c===0){return-1}var d=0;if(arguments.length>1){d=Number(arguments[1]);
if(d!=d){d=0}else if(d!=0&&d!=Infinity&&d!=-Infinity){
d=(d>0||-1)*Math.floor(Math.abs(d))}}if(d>=c){return-1}
var e=d>=0?d:Math.max(c-Math.abs(d),0);for(;e<c;e++){
  if(e in b&&b[e]===a){return e}}return-1}}

//constants
GA_NAME = 'inj';
ERROR = -1;

// helper blocks
function getLoc(data, string)
{
  data.sort();
  return data.indexOf(string);
};

function insertItem(data, item)
{
  data.push(item);
  data.sort();
  return data.indexOf(item);
};

function parseSlot(slot)
{
  var current = _gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(slot);
  if(current)
  {
    current = current.split(', ');
    return current;
  }
  return 0;
};

function parseDict(slot)
{
  var current = _gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(slot);
  if(current)
  {
    current = JSON.parse(_gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(slot));
    return current;
  }
  return 0;
};

function clearAll()
{
  for(var i=0; i<=5;i++)
    _gaq.push(['inj._deleteCustomVar', i]);
  console.log('All custom vars cleared.');
};

function printAllVars()
{
  console.log('GA custom vars:')
  for(var i=1; i<=5;i++)
    console.log(i+ ': ' + _gat._getTrackerByName(GA_NAME)._getVisitorCustomVar(i));
};


// Set demographic information.
function addType(user_type)
{
  var current = parseSlot(1) || [];
  var loc;
  if(current.length > 0)
    { 
        if(current.indexOf(user_type) != ERROR)
          return ERROR;
    }  

    loc = insertItem(current, user_type);
    _gaq.push(['inj._setCustomVar',1,current.join(', '),current.join(', '),1]);
    return loc;
};

// Increment engagement score
function addScore(loc, new_value, isNew)
{
  var current = parseSlot(2) || [];
  if(isNew)
  {
    current.splice(loc, 0, new_value);
  }
  else
  {
    if(current.length != 0 && current.length >= loc)
        current[loc] += new_value;
      else  
        current.push(new_value);
  }
    _gaq.push(['inj._setCustomVar',2,current.join(', '),current.join(', '),1]);
    return 1;
};

// add Nexis/ISIS ID for specific demographic
function addID(loc, new_id)
{
  var current = parseSlot(3) || [];
  var temp;
  if(current.length >= loc)
  {
    if(current[loc].indexOf(new_id) != ERROR)
      return ERROR;

    if(typeof(current[loc]) == 'string')
      {
        temp = current[loc];
        current[loc] = [temp, new_id];
      }
      else
        current[loc].push(new_id);
  }
    else  
      current.push(new_value);
    _gaq.push(['inj._setCustomVar',3,current.join(', '),current.join(', '),1]);
    return 1;
};

function addVisit(page_id)
{
  var current = parseDict(5) || {};
  var confirm = 1;
  if(current[page_id])
  {
    current[page_id] += 1;
    confirm = ERROR;
  }
  else 
      current[page_id] = 1;

    _gaq.push(['inj._setCustomVar',5,JSON.stringify(current),JSON.stringify(current),1]);
    return confirm;
};


// run through the actions
function pushMilestone(demographic, page_value, page_id)
{
    var check = ERROR;
    var loc = 0;
    var isNew = 1;

    check = addVisit(page_id);

    if(check != ERROR)
    {
        loc = addType(demographic);
        console.log(loc);
        if(loc == ERROR)
          isNew = 0;
        addScore(loc, page_value, isNew);
    }
    _gaq.push(['inj._trackEvent','user activity', 'status change',]);
    return check;
};

/********************************************************************
 * Testing bit:
 *    - Chrome (win)
 *    - IE 9
 *    - Firefox (win)
 ********************************************************************/

// clear all custom vars for testing
clearAll();

/* Running sample: usertype 1 */

var demographic = 'type1';
var page_value = 4;
var page_id = 1;

try 
{
  (pushMilestone(demographic, page_value, page_id) == ERROR) ?
    console.log('Something went horribly wrong.') : console.log('Success.');
}
catch (error) 
{
  console.log('Caught: ' + error.message);
}


/* Running sample: usertype 2 */

var demographic = 'type2';
var page_value = 6;
var page_id = 12;

// run data push
(pushMilestone(demographic, page_value, page_id) == ERROR) ?
  console.log('Something went horribly wrong.') : console.log('Success.');

