exports.replace_ = function (obj) {
	var errorThrown = {};
	for (var i in obj) {
		obj[i].property = obj[i].property.replace("_", " ");
		if (!errorThrown[obj[i].property])
			errorThrown[obj[i].property] = obj[i].message;
	}
	return errorThrown;
}
