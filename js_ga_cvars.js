 // prosp undergrad
 _gaq.push(['inj._setCustomVar',
      1,                   
      'demographics',      
      'type1',               
      1                    
   ]);
 _gaq.push(['inj._trackEvent',
      'User activity', 
      'Status change', 
   ]);

 // current staff
  _gaq.push(['inj._setCustomVar',
      1,                   
      'demographics',      
      'type2',               
      1                    
   ]);
 _gaq.push(['inj._trackEvent',
      'User activity', 
      'Status change', 
   ]);

 // delete var
 _gaq.push(['inj._deleteCustomVar', 1]);

 // get current content
  _gat._getTrackerByName('inj')._getVisitorCustomVar(1);

if(_gat._getTrackerByName('inj')._getVisitorCustomVar(1))
{ 
	var temp = _gat._getTrackerByName('inj')._getVisitorCustomVar(1);
	console.log(temp + "," + "test");
}

// Live code - Slot 1 - Demographics

var new_val = "type1";
var current_val = _gat._getTrackerByName('inj')._getVisitorCustomVar(1);
if(current_val)
{ 
	if(current_val.indexOf(new_val) == -1)
	{
		if(current_val.indexOf("prosp") != -1)
			new_val += ", " + current_val;
		else new_val = current_val + ", " + new_val;
		_gaq.push(['inj._setCustomVar',1,'demographics',new_val,1]);
		_gaq.push(['inj._trackEvent','user activity', 'status change',]);
	}
}	

// Live code - Slot 5 - Engagement list
var JSON = JSON || {};
var current_list = _gat._getTrackerByName('inj')._getVisitorCustomVar(5);
if(!current_list)
	current_list = {};
else var current_list = JSON.parse(_gat._getTrackerByName('inj')._getVisitorCustomVar(5));

if(!current_list[1])
{
	current_list[1] = 1;
	_gaq.push(['inj._setCustomVar',5,'engagement list',JSON.stringify(current_list),1]);
	_gaq.push(['inj._trackEvent','user activity', 'engagement list change',]);
}

// Live code - Slot 2 - Engagement Level

var new_val = 4;
var current_val = _gat._getTrackerByName('inj')._getVisitorCustomVar(2);
if(current_val)
	new_val += current_val;
_gaq.push(['inj._setCustomVar',2,'engagement level',new_val,1]);
_gaq.push(['inj._trackEvent','user activity', 'engagement level change',]);
