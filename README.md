###### Neighborhood Map Project

This is an interactive map of downtown Bellingham, Washington. You'll find it populated with a number of markers that represent businesses that I'm fond of within the area. Each of these markers will provide you information about the business.


## Functionality

* The map will be populated with information from the JSON in js/app.js
	* Clicking on one of the markers will display an infowindow with the title of the business, a streetview image, and gathers information from Foursquare including: a link to the business twitter account, a link to the website, the phone number and the address.
		* If any of these individual pieces information for the business can't be found on Foursquare message will display saying that it can't be found.
		* If the request for information from Foursquare can't be completed an error message will display in place of all Foursquare information. 
* A list in the top right corner is populated with names of the businesses.
	* Clicking on a business name in the list will open the infowindow for the appropriate marker.
	* User can filter the list by typing in it, either searching by business name or category such as "bar" or "food", removing information by deleting repopulates the list with all locations.
		* When the user begins typing all infowindows are closed in order to avoid lingering windows for already filtered items.
	