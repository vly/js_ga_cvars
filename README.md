Google Analytics custom vars key pages tracking
===============================================

Description
-----------
Functionality for keeping track and attributing values to key website pages
on a single or multiple sites.

* Supports multiple audiences. 
* Keeps counter for visits to key pages
* Works particularly well when combined with Google Tag Manager (http://www.google.com/tagmanager).
* Can be used for prioritising enquiries.

Example usage
-------------

Prospective buyer visits /products page (page ID 1), which has an arbitrary value 
of 2 associated with it.

First, we define the push functionality

```
function test_run(demographic, page_value, page_id)
{
	try {
		(pushMilestone(demographic, page_value, page_id) == ERROR) ?
		console.log('Error.') : console.log('Success.');
	}
	catch (error) {
		console.log('Error: ' + error.message);
	}
}
```

Next we push the demographic information and value into slot 1 if user has not
visited the page before.

```
var demographic = 'prospective buyer';
test_run(demographic, 2, 1);
 ```
