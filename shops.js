/**
	A shop is a JSON object which may have any the following properties, except where two properties are mutually exclusive:
	
		shopname
			A human-readable string that identifies a particular shop. Not necessarily the shop's actual name, but ideally the shop's common name.
			Examples:
				"little spar"
				"Stars"
				
		address
			A string of the street address of the shop, not including postcode. Usually uniquely identifies a building.
			In future releases, it will be possible to search for open shops within a given range of a given address.
			In future releases, it will be possible to search for open shops that will deliver to a given address.
			In future releases, it will be possible to search for shops that will be open by the time it is possible to (walk|cycle|drive) to that shop.
			Examples:
				"39-40 Great Darkgate Street"
				"32 Terrace Road"
				
		postcode
			A string of the postcode of the shop.
			For future plans, see "address", above and s/address/postcode/ .
			Examples: 
				"SY23 1DE"
				"SY23 2AE"
				
		times
			An array of arrays of objects representing the opening times of the shop. This one's a doozy.
			Top level array must be either 1,2,3 or 7 elements long.
				If one element long, it is assumed that the same opening times are used every day of the week.
				If two elements long, it is assumed that the FIRST element is SUNDAY, and the other is for every other day of the week.
				If three elements long, it is assumed that the FIRST element is SUNDAY, the LAST element is saturday, and the other is for every other day of the week.
				If seven elements long, each element represents a day of the week, with element 0 being SUNDAY.
			Second level array is for multiple openings and closings per day.
			Third level "array" is for open/close pairs.
			Time must be of the format HH:mm and must be 24-hour time. If the closing time of a pair is numerically before the opening time of that pair, it is assumed the shop stays open across the midnight barrier and that the closing time is for the following day.
			TK: Being open 24 hours a day for some days of the week but not all.
			If the shop is open 24 hours a day every day of the week, do not use the "times" element, instead use the "is24hour" element (see below).
			Examples:
				[[{"open":"07:00", "close":"23:00"}]]
					for a shop that every day opens at 7AM and closes at 11PM.
				[[{"open":"19:00", "close":"03:00"}]]
					for a shop that every day opens at 7PM and closes at 3AM the next day.
				[[{"open":"11:00", "close":"13:00"}, {"open":"17:00", "close" : "21:00"}]]
					for a shop that every day opens at 11AM, closes at 1PM, and then re-opens at 5PM and finally closes at 9PM.
				[
					[{"open":"10:00", "close":"16:00"}],
					[{"open":"07:00", "close":"23:00"}]
				]
					for a shop that on sunday opens at 10AM and closes at 4PM and monday-saturday opens at 7AM and closes at 11PM.
				[
					[{"open":"12:00", "close":"16:00"}],
					[{"open":"07:00", "close":"23:00"}],
					[{"open":"10:00", "close":"16:00"}]
				]
					for a shop that on sunday opens at 12PM noon and closes at 4PM, on saturday open at 10AM and closes at 4PM, and monday-friday opens at 7AM and closes at 11PM.
				[
					[{"open":"12:00", "close":"16:00"}],
					[{"open":"07:00", "close":"17:00"}],
					[{"open":"08:00", "close":"17:00"}],
					[{"open":"09:00", "close":"17:00"}],
					[{"open":"10:00", "close":"17:00"}],
					[{"open":"11:00", "close":"17:00"}],
					[{"open":"12:00", "close":"17:00"}]
				]
					for a shop that:
						on sunday opens at 12PM noon and closes at 4PM,
						on monay opens at 7AM and closes at 5PM,
						on tuesday opens at 8AM and closes at 5PM,
						on wednesday opens at 9AM and closes at 5PM,
						on thursday opens at 10AM and closes at 5PM,
						on friday opens at 11AM and closes at 5PM, and
						on saturday opens at 12PM noon and closes at 5PM.
					goodness knows why, but it could happen.
				
					
		is24hour
			Boolean value to represent a shop being 24 hour. If the shop is not 24 hour, this is not a necessary element but it is necessary to list its opening times using the "times" element (see above).
			Examples:
				true
		
		doesDeliver
			Boolean value to represent whether a place offers a delivery service. If it does, please include a relevant "phone" or "website" element (below). Not necessary if false.
			Examples:
				true
				
		phone
			A string of the phone number for the place in question. Please include area code. Most useful for places that deliver.
			Examples:
				"01970 612111"
				
		website
			A string that is the full url for the website for the place in question. Most useful for places that deliver.
			In future releases, places with a website will have clickable doodads in the tooltip.
			Examples:
				"http://www.example.com"
				"http://www.example.com/aberystwyth"
				
		sells
			An array of strings to represent products that the shop sells.
			In future releases, it will be possible to search for only shops that sell a particular product or list of products.
			Examples:
				["corn", "lobster"]
				["breakfast", "chips", "deep fried mars bar"]
				
*/
var shops = [
	{
		"shopname":"Top Spar",
		"address":"39-40 great darkgate street",
		"postcode":"SY23 1DE",
		"times": [[{"open":"07:00", "close":"23:00"}]],
		"sells": ["groceries","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"24 Hour Spar",
		"address":"32 Terrace Road",
		"postcode":"SY23 2AE",
		"is24hour": true,
		"sells": ["groceries","hot food","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"Little Spar",
		"address":"Northgate",
		"postcode":"SY23 2EN",
		"times": [[{"open":"07:00", "close":"23:00"}]],
		"sells": ["groceries","hot food","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"Penparcau Spar",
		"address":"Awel Y Don",
		"postcode":"SY23 1RR",
		"times": [[{"open":"05:30", "close":"22:00"}]],
		"sells": ["groceries","hot food","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"Morrisons",
		"address":"Parcydolau",
		"postcode":"SY23 3RN",
		"times":
			[
				//sunday
				[{"open":"10:00", "close":"16:00"}],
				//mon-sat
				[{"open":"08:00", "close":"21:00"}]
			],
		"sells": ["groceries","hot food","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"Co-Op",
		"address":"Park Avenue",
		"postcode":"SY23 1PB",
		"times": 
			[
				//sunday
				[{"open":"10:00", "close":"16:00"}],
				//mon-sat
				[{"open":"07:00", "close":"22:00"}]
			],
		
		"sells": ["groceries","hot food","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"McDonalds",
		"address":"Parc-Y-Llyn Retail Park",
		"postcode":"SY23 3TL",
		"times": [[{"open":"06:00", "close":"23:00"}]],
		"sells": ["groceries","hot food","frozen food","alcohol","tobacco"]
	},
	{
		"shopname":"Dominos Pizza",
		"address":"Unit 1 The Barn Centre, Alexandra Road",
		"postcode":"SY23 1LN",
		"doesDeliver":true,
		"phone":"01970 612111",
		"times": [[{"open":"11:00", "close":"23:00"}]],
		"sells": ["pizza"]
	},
	{
		"shopname":"Lidl",
		"address":"Rheidol Retail Park",
		"postcode":"SY23 2LL",
		"times":
			[
				//sunday
				[{"open":"10:00", "close":"16:00"}],
				//mon-sat
				[{"open":"08:00", "close":"20:00"}]
			],
		"sells": ["groceries","bread","alcohol"]
	},
	{
		"shopname":"Iceland",
		"address":"Rheidol Retail Park",
		"postcode":"SY23 2LL",
		"times":
			[
				//sunday
				[{"open":"10:00", "close":"16:00"}],
				//mon-sat
				[{"open":"08:30", "close":"19:00"}]
			],
		"sells": ["groceries","alcohol"]
	},
	
];