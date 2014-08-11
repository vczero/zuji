
var Location = {};

Location.getDistance = function(loc1, loc2){
	var R = 6378137, 
		d2r = Math.PI / 180,
		dLat = (loc1.x - loc2.x) * d2r,
		dLon = (loc1.y - loc2.y) * d2r,
		lat1 = loc2.x * d2r,
		lat2 = loc1.x * d2r,
		sin1 = Math.sin(dLat / 2),
		sin2 = Math.sin(dLon / 2);

	var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}


Location.getLocByDistance = function(loc, distance){
	
}

module.exports = Location;