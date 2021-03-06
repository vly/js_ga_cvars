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

####Basics
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

This results in the following values being stored in the custom variables on
the visitor level.
```
> cstVars.printAllVars()
 GA custom vars: 
 Slot 1 key: prospective buyer
 1: 4 
 2: undefined 
 3: undefined 
 4: undefined 
 5: {"1":1} 
```
The counter value in the key/value pair within slot 5 represents the visits count
to the specific page. If a user has visited the page before, the count will
incriment, however, the pageValue will not.

####Multiple user types
The script can handle multiple user types being stored against an individual
visitor to the website, with a unique count per type.

For example, in case the above prospective buyer than logs in onto the website
thus indicating a repeat buyer, we can flag them as such.
```
var demographic = 'returning buyer';
var uniquePageID = 20;
var pageValue = 10;
cstVars.pushPage(demographic, pageValue, uniquePageID);
 ```

 Resulting in the following custom variables cookie data.
 ```
> cstVars.printAllVars()
 GA custom vars: 
 Slot 1 key: prospective buyer, returning buyer
 1: 4, 10
 2: undefined 
 3: undefined 
 4: undefined 
 5: {"1":1, "20":1} 
```

These individual counts could potentially allow for applying thresholds to
filter out false positives (subject to site IA).