/********************************************************************
 * Testing bit:
 *      - Chrome (win)
 *      - IE 9
 *      - Firefox (win)
 ********************************************************************/

// clear all custom vars for testing
clearAll();

function test_run(demographic, page_value, page_id)
{
    try 
    {
        (pushMilestone(demographic, page_value, page_id) == ERROR) ?
            console.log('Error.') : console.log('Success.');
    }
    catch (error) 
    {
        console.log('Error: ' + error.message);
    }
    printAllVars();
}

// type2 journey
var demo = 'type2';
test_run(demo, 4, 21); // visit to page1
test_run(demo, 4, 22); // visit to page2
test_run(demo, 4, 25); // pdf1 download 
test_run(demo, 6, 28); // external site1 click

// type3 journey
var demo = 'type3';
test_run(demo, 1, 31);
test_run(demo, 6, 32);
test_run(demo, 2, 34);
test_run(demo, 2, 30);

// type1 journey
var demo = 'type1';
test_run(demo, 4, 2);
test_run(demo, 4, 3);
test_run(demo, 4, 8);
test_run(demo, 4, 9);
