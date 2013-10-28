/**WHAT TIME IS IT?*/
var now = moment();
/**WHAT DAY OF THE WEEK IS IT? Remember, in momentjs, Sunday is always 0*/
var dayOfWeek = now.day(); 

/*
	var openingtime = moment(thisShop.times[foo][i].open, "HH:mm");
	if listeddays = 1, foo = 0
	if listeddays = 2
		if dayOfWeek > 1 foo = 1 else listeddays = dayOfWeek
	if listeddays = 3
		if dayofWeek == 6 foo = 3 else if dayOfWeek > 1 foo = 1 else listeddays = dayOfWeek
	if listeddays = 7, foo = dayOfWeek
	else error
	
		
*
/**Checks if a given shop is open now. */
function isOpen(thisShop){
	//24 hour places are easy, they're always open
	if(thisShop.is24hour == true){
		return true;
	//otherwise, it's a bit messier. TODO: there must be a better way.
	}else{
		var listeddays = thisShop.times.length;
		
		//if there's 7 listed days, use the day of the week.
		if (listeddays == 7){
			var relevantday = dayOfWeek;
		//if there's 3 listed days, the first is sunday, the second is mon-fri, the last is saturday
		}else if (listeddays == 3){
			if(dayOfWeek == 6){
				//if it's saturday, use the last listedday
				relevantday = 3;
			}else if (dayOfWeek > 1){
				//if it's mon-fri, use the second element
				relevantday = 1;
			}else{
				//if it's sunday, use the first element
				relevantday = 0;
			}
		//if there's 2 listed days, the first is sunday, the second is mon-sat
		}else if (listeddays == 2){
			if (dayOfWeek > 1){
				//if it's mon-sat, use the last element
				relevantday = 1;
			}else{
				//if it's sunday, use the first element
				relevantday = 0;
			}
		//if there's only 1 listed day, it's the same time every day
		}else if (listeddays == 1){
			//there's only one element, so use that one
			var relevantday = 0;
		//if there's any other number than 1,2,3, or 7 listed days, complain to the console and pretend there's only one listed day.
		}else{
			console.log("something's gone wrong, " + thisShop.shopname + " does not have a correct number of days listed (must be 1,2,3 or 7 ONLY). Please consult documentation. Using first element for all days of week (this is probably NOT what you want!)");
			var relevantday = 0;
		};
		var listedpairs = thisShop.times[relevantday].length;
		for(var i = 0; i < listedpairs; i++){
			var openingtime = moment(thisShop.times[relevantday][i].open, "HH:mm");
			var closingtime = moment(thisShop.times[relevantday][i].close, "HH:mm");
			
			//deal with places that stay open past midnight.
			//step 1: detect one of those places. anywhere that has a closing time before its opening time is assumed to still travel forward in time and thus stay open past midnight
			if (closingtime.isBefore(openingtime)){
				//if it's after openingtime, then it closes tomorrow
				if(now.isAfter(openingtime)){
					closingtime.add("days", 1);
				};
				//if it's before closing time, then it opened yesterday
				if(now.isBefore(closingtime)){
					openingtime.subtract("days",1);
				}
			};
			
			//deal with places that open and close on the same calendar day, and with places processed by the above.
			if (now.isAfter(openingtime) && now.isBefore(closingtime)){
				return true;
			}else{
				return false;
			};
		};
	};
};

/**Checks all shops for open-ness */
function wheresOpen(){
	var these = new Array;
	var len = shops.length;
	for (var i = 0; i < len; i++){
		if(isOpen(shops[i])){		
			these.push(shops[i]);
		}
	}
	return these;
};

/**
	Takes an array of open shops and prepares them for insertion to the html document. At present only gives the name. In future will give address, specific opening times etc on mouseover.
*/
function makestring(shoparr){
	var len = shoparr.length;
	var shopnamearr = new Array;
	for (var i = 0; i < len; i++){
			var shopitem = shoparr[i].shopname;
			shopnamearr.push(shopitem);
	}
	var shop_separator = "</span><span class='shopstringseparator'> - </span><span class='shopstringitem'>";

	shopstring = "<span class='shopstringitem'>" + (shopnamearr.join(shop_separator)) + "</span>";
	return shopstring;
};

/** Updates an element with id="target" to become "input"*/
function updatehtml(target, input){	
	document.getElementById(target).innerHTML=input;
};

/**helper function. cuts down on typing. */
function oneUpdater(){
	updatehtml("prefix", "At time of page load, the following shops seem open:");
	updatehtml("shopstring", makestring(wheresOpen()));
};

oneUpdater();