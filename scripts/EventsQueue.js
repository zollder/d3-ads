
var EventsQueue = {
	/* Underlying EventsQueue data structure holder. */
	tree: null,

	/*  Initializes and returns an events/points tree data structure.
	 Creates a new RB tree with events comparator.
	 Points are sorted by X (key) coordinate. */
	init: function() {
		if (!this.tree) {
			this.tree = new RBTree(function(a, b) {
				return a.x - b.x;
			});
		}
		return this;
	},

	/* Inserts end points of known line segments into the tree. */
	populate: function(linesMap) {
		if (linesMap && this.init()) {
			var eq = this;
			linesMap.forEach(function(value, key) {
				eq.tree.insert(new EventPoint("left", key, value.left.x, value.left.y, null));
				eq.tree.insert(new EventPoint("right", key, value.right.x, value.right.y, null));
			});
		} else {
			console.log("Lines map is undefined.");
		}
		console.log("Events: ", this.tree);
		return this;
	},

	/*	Returns an element with the minimum key.
	 Initializes the tree, if not already initialized. */
	getMin: function() {
		return this.init().tree.min();
	},

	/* Returns true if the queue is empty, or false otherwise.
	 * Initializes the tree, if not already initialized. */
	isEmpty: function() {
		return this.init().tree.size === 0;
	},

	/* Inserts an event with the unique key into the queue.
	 * An event is ignored if the key already exists. */
	insert: function(event) {
		if (event && this.init()) {
			if (!this.tree.insert(event)) {
				console.log("Event already exists:", event);
			}
		} else {
			console.log("Event undefined:");
		}
		return this;
	},

	/* Inserts an intersection event if the queue is empty or
	 * it's key is greater than the smallest key in the queue. */
	insertIntersection: function(event) {
		if (event && !event.isIntersection()) {
			console.log("Not an intersection event: ", event);
		}
		if (event && (this.isEmpty() || event.x > this.tree.min().x)) {
			console.log("Add intersection event: ", event);
			this.tree.insert(event);
		}
		return this;
	},

	/* Tries to remove an event from the queue if the queue is initialized.
	 * Initializes the queue otherwise. */
	remove: function(event) {
		if (event && this.init()) {
			if (this.tree.remove(event)) {
				console.log("Removed event: ", event);
			} else {
				console.log("Can't remove non-existing event: ", event);
			}
		}
		return this;
	},

	/* Prints all queue events in-order. */
	print: function() {
		var printSet = [];
		this.tree.each(function(item) {
			printSet.push(item);
		});
		console.log("Event set: ", printSet);
	}
};