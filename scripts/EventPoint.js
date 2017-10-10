
// TODO: define Point object and use it in EventPoint and Segment
var EventPoint = function EventPoint (type, id, x, y, ids) {
	this.type = type;
	this.lineId = id;
	this.x = x;
	this.y = y;
	this.ids = ids;
};

EventPoint.prototype = {
	constructor: EventPoint,

	isLeft: function() {
		return this.type === "left";
	},

	isRight: function() {
		return this.type === "right";
	},

	isIntersection: function() {
		return this.type === "intersection" && this.ids != null;
	},

	/*
	 Verifies if the point is in range of the segment.
	 Returns true if the point lies within segment's projections, or false otherwise.
	 */
	inRange: function(left, right) {
		if (!left || !right)
			return false;

		return this.x >= this.min(left.x, right.x)
			&& this.y >= this.min(left.y, right.y)
			&& this.x <= this.max(left.x, right.x)
			&& this.y <= this.max(left.y, right.y);
	},

	/* Draws intersection point (itself) */
	drawIntersection: function() {
		if (this.isIntersection()) {
			svg.append("circle")
				.data([this])
				.style("fill",'red')
				.attr("r", 3)
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		} else {
			console.log("Not an intersection point", this);
		}
		return this;
	},

	/* Draws specified point, TODO: find a better place/use-case (segment?) */
	drawPoint: function(point) {
		svg.append("circle")
			.data([point])
			.style("fill",'green')
			.attr("r", 3)
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		return this;
	},

	drawLabel: function() {
		svg.append("text")
			.data([this])
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("dx", "-10")
			.attr("dy", "-5")
			.text(function(d) { return d.lineId; });
	},

	min: function(val1, val2) {
		return val1 < val2 ? val1 : val2;
	},

	max: function(val1, val2) {
		return val1 > val2 ? val1 : val2;
	}
};