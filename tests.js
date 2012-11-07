/********************************************************************
 * Testing bit:
 *      - Chrome (win)
 *      - IE 9
 *      - Firefox (win)
 ********************************************************************/

// clear all custom vars for testing
clearAll();


// type2 journey
var demo = 'type2';
cstVars.pushPage(demo, 4, 21); // visit to page1
cstVars.pushPage(demo, 4, 22); // visit to page2
cstVars.pushPage(demo, 4, 25); // pdf1 download 
cstVars.pushPage(demo, 6, 28); // external site1 click

// type3 journey
var demo = 'type3';
cstVars.pushPage(demo, 1, 31);
cstVars.pushPage(demo, 6, 32);
cstVars.pushPage(demo, 2, 34);
cstVars.pushPage(demo, 2, 30);

// type1 journey
var demo = 'type1';
cstVars.pushPage(demo, 4, 2);
cstVars.pushPage(demo, 4, 3);
cstVars.pushPage(demo, 4, 8);
cstVars.pushPage(demo, 4, 9);
