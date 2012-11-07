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

Usage would be to push the demographic information and value into slot 1 if user 
has not visited the page before.

```
var demographic = 'prospective buyer';
var uniquePageID = 1;
var pageValue = 4;
cstVars.pushPage(demographic, pageValue, uniquePageID);
 ```
