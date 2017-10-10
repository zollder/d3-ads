
var Segment = function Segment (id, left, right) {
	this.id = id;
	this.ref = left;
	this.left = left;
	this.right = right;
};

Segment.prototype = {
	constructor: Segment,

	setRef: function(refPoint) {
		this.ref = refPoint;
		return this;
	},

	updateRefByX : function(xRef) {
		var x1 = this.left.x;
		var x2 = this.right.x;
		var y1 = this.left.y;
		var y2 = this.right.y;
		var A = y2 - y1;
		var B = x1 - x2;
		var C = A*x1 + B*y1;
		// Ax + By = C => y = (C - Ax) / B
		var yRef = (C - A*xRef)/B;
		return this.setRef({x:xRef, y:yRef});
	},

	updateRefByY: function(yRef) {
		var x1 = this.left.x;
		var x2 = this.right.x;
		var y1 = this.left.y;
		var y2 = this.right.y;
		var A = y2 - y1;
		var B = x1 - x2;
		var C = A*x1 + B*y1;
		// Ax + By = C => x = (C - By) / A
		var xRef = (C - B*yRef)/A;
		return this.setRef({x:xRef, y:yRef});
	}
};