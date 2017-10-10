
var SweepLine = {
	tree: null,

	init: function() {
		console.log("Initializing SL tree");
		this.tree = new RBTree(function(a, b) {
			return a.ref.y - b.ref.y;
		});
		return this;
	},

	insert: function(segment) {
		if (!this.tree) {
			this.init();
		}
		if (!this.tree.insert(segment)) {
			console.log("Segment exists:", segment.id);
		} else {
			console.log("SL add: ", segment.id);
		}
		return this;
	},

	insertAndReorder: function(segment) {
		return this.insert(segment).reorder(segment.ref.x);
	},

	remove: function(segment) {
		if (!this.tree) {
			console.log("SL is not initialized");
		}
		if (!this.tree.remove(segment)) {
			console.log("Segment doesn't exists:", segment.id);
		} else {
			console.log("SL remove: ", segment.id);
		}
		return this;
	},

	reorder: function(xRef) {
		var sl = this;
		console.log("SL reorder all");
		this.getNodes().forEach(function(node) {
			sl.remove(node).insert(node.updateRefByX(xRef));
		});
		return this;
	},

	next: function(segment) {
		if (!this.tree || !segment) {
			return null;
		}
		var iterator = this.tree.findIter(segment);
		if (iterator && iterator.next()) {
			return iterator.data();
		}
		return null;
	},

	previous: function(segment) {
		if (!this.tree || !segment) {
			return null;
		}
		var iterator = this.tree.findIter(segment);
		if (iterator && iterator.prev()) {
			return iterator.data();
		}
		return null;
	},

	getNodes: function () {
		var nodes = [];
		if (!this.tree) {
			return nodes;
		}
		this.tree.each(function(node) {
			nodes.push(node);
		});
		return nodes;
	},

	print: function() {
		if (!this.tree) {
			console.log("SL tree is not initialized");
			return;
		}
		var printSet = [];
		this.tree.each(function(segment) {
			printSet.push(segment.id);
		});
		console.log("SL tree: ", printSet);
	},

	swap: function(seg1, seg2) {
		this.print();
		console.log("SL swapping: ", seg1.id, seg2.id);
		if (this.tree.remove(seg1) && this.tree.remove(seg2)) {
			var yRefSeg1 = seg1.ref.y;
			var yRefSeg2 = seg2.ref.y;
			this.insert(seg1.updateRefByY(yRefSeg2));
			this.insert(seg2.updateRefByY(yRefSeg1));
		}
		this.print();
		return this;
	}
};