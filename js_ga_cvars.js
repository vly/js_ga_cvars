// set or append demographic information to slot 1, visitor level
function setDemo(demographic)
{
    var current_val = _gat._getTrackerByName('inj')._getVisitorCustomVar(1);
    if(current_val)
    { 
        if(current_val.indexOf(demographic) == -1)
        {
            if(current_val.indexOf("prosp") != -1)
                demographic += ", " + current_val;
            else demographic = current_val + ", " + demographic;
            _gaq.push(['inj._setCustomVar',1,'user type',demographic,1]);
            return 1;
        }
        return 0;
    }   
    else 
    { // case no demographic data set
        _gaq.push(['inj._setCustomVar',1,'user type',demographic,1]);
        return 1;
    }

};

// append to/initiate engagement milestones list
function listAppend(page_id)
{
    var JSON = JSON || {};
    var current_list = _gat._getTrackerByName('inj')._getVisitorCustomVar(5);
    if(!current_list)
        current_list = {};
    else var current_list = JSON.parse(_gat._getTrackerByName('inj')._getVisitorCustomVar(5));

    if(!current_list[page_id])
    {
        current_list[page_id] = 1;
        _gaq.push(['inj._setCustomVar',5,'engagement list',JSON.stringify(current_list),1]);
        return 1;
    }
    return 0;
};

// incremenet engagement level tally.
// PROBLEM: which demographic does the tally belong to?
function levelAdd(page_value)
{
    var current_val = _gat._getTrackerByName('inj')._getVisitorCustomVar(2);
    if(current_val)
        page_value += current_val;
    _gaq.push(['inj._setCustomVar',2,'engagement level',page_value,1]);
    return 1;
};

// run through the actions
function pushMilestone(demographic, page_value, page_id)
{
    var check = 0;

    check = listAppend(page_id);

    if(check)
    {
        setDemo(demographic);
        levelAdd(page_value);
        _gaq.push(['inj._trackEvent','user activity', 'status change',]);
    }
    return check;
}


var demographic = "type1"
var page_value = 4;
var page_id = 1;

// run data push
pushMilestone(demographic, page_value, page_id);
