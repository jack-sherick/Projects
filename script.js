// module aliases
let Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Runner = Matter.Runner,
	Bounds = Matter.Bounds,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Constraint = Matter.Constraint,
	Events = Matter.Events,
	MouseConstraint = Matter.MouseConstraint,
	Query = Matter.Query,
	Mouse = Matter.Mouse;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
	  wireframes: false,
	  width: window.innerWidth,
	  height: window.innerHeight
    }
});

// add mouse input
let mouse = Mouse.create(render.canvas)
let	mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	collisionFilter: {
		group: 1
	},	
	constraint: {
		stiffness: .2,
		render: {
			visible: false
		}
	}
});
World.add(engine.world, mouseConstraint);

//create bodies for cards in hand
hold1 = Matter.Bodies.rectangle(300, 650, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6,
		strokeStlye: "red"
	}
})
hold2 = Matter.Bodies.rectangle(450, 650, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6,
		strokeStlye: "red"
	}
})
hold3 = Matter.Bodies.rectangle(1000, 100, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6,
		strokeStlye: "red"
	}
})
hold4 = Matter.Bodies.rectangle(1150, 100, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6,
		strokeStlye: "red"
	}
})

//cards in play
table1 = Matter.Bodies.rectangle(500, 360, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6
	}
})
table2 = Matter.Bodies.rectangle(650, 360, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6
	}
})
table3 = Matter.Bodies.rectangle(800, 360, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6
	}
})
table4 = Matter.Bodies.rectangle(950, 360, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6
	}
})
table5 = Matter.Bodies.rectangle(1100, 360, 110, 150, {
	collisionFilter: {
		group: -1
	},
	isStatic: true,
	render: {
		fillStyle: "black",
		lineWidth: 6
	}
})
World.add(engine.world, [hold1, hold2, hold3, hold4, table1, table2, table3, table4, table5])
//chips
let p1chips = [];
for (let i = 0; i < 20; i++) {
	if (i < 10) {
		p1chips.push(Matter.Bodies.circle(790+(i*4), 700, 20, {
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: "blue",
				lineWidth: 4
			},
		}))
	}
	else {
		p1chips.push(Matter.Bodies.circle(790+(i*4), 740, 20, {
			collisionFilter: {
				group: 1
			},
			render: {
				fillStyle: "blue",
				lineWidth: 4
			},
		}))
	}
}
World.add(engine.world, p1chips)

//add keyboard input
const keys = [];
document.onkeydown = event => {
  keys[event.keyCode] = true;
  //console.log(event.keyCode);
};
document.onkeyup = event => {
  keys[event.keyCode] = false;
};

engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

//declares deck
let deck = [{
	suit: "",
	value: 0,
	onBoard: false,
	asset: null,
}]

//passes values and bodies for the deck
for (let i = 1; i < 14; i++) {
	deck.push({
		suit: "spade",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: {
				group: -1
			},
			inertia: Infinity,
			onBoard: false,
			render: {
				fillStyle: "green",
				lineWidth: 3,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < 14; i++) {
	deck.push({
		suit: "club",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: {
				group: -1
			},
			inertia: Infinity,
			onBoard: false,
			render: {
				fillStyle: "green",
				lineWidth: 3,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < 14; i++) {
	deck.push({
		suit: "heart",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: {
				group: -1
			},
			inertia: Infinity,
			onBoard: false,
			render: {
				fillStyle: "green",
				lineWidth: 3,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < 14; i++) {
	deck.push({
		suit: "diamond",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: {
				group: -1
			},
			inertia: Infinity,
			onBoard: false,
			render: {
				fillStyle: "green",
				lineWidth: 1.5,
				strokeStlye: "black"
			}
		})
	})
}

//removes blank card
deck.splice(0, 1);

//shuffles the deck
let counter
let counterArr = [];
let counterBool = false;
let shuffledDeck = [];
let cardBeingDragged;

for (let i = 0; i < deck.length; i++) {
	counter = Math.floor(Math.random() * Math.floor(deck.length));
	for (let x = 0; x < counterArr.length; x++) {
		if (counterBool) {
			x+100;
			counterBool = false;
		}
		if (counter === counterArr[i]) {
			counterBool = true;
		}
	}
	if (!counterBool) {
		counterArr.push(counter);
		shuffledDeck.push(deck[counter]);
	}
}

//adds the deck to the world
for (let i = 0; i < shuffledDeck.length; i++) {
	World.add(engine.world, shuffledDeck[i].asset);
}

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
	min: { x: 0, y: 0 },
	max: { x: window.innerWidth, y: window.innerHeight }
});

///variables
//card being hovered by cursor
let hoverCard = [];
//bool for hover
let hoverCardBool = false;
let p1hand = [];
let p2hand = [];
let tableHand = [];
let gameState = 0;

//animation loop
function cycle() {

	//prevents the dragging of cards beneath the top one
	for (let i = shuffledDeck.length-1; i > 0; i--) {
		if (shuffledDeck[i].asset.collisionFilter.group === 1) {
			for (let x = i-1; x > 0; x--) {
				if (!shuffledDeck[x].asset.onBoard) {
					Matter.Body.set(shuffledDeck[x].asset, {
						collisionFilter: {
							group: -1
						}
					})
				}
			}
		}
	}
	
	//allows for the dragging of the top card of the deck
	for (let i = 0; i < shuffledDeck.length; i++) {
		hoverCard = Matter.Query.point([shuffledDeck[i].asset], {
			x: mouse.position.x,
			y: mouse.position.y
		});
		if (hoverCard.length >= 1) {
			for (let x = 0; x < hoverCard.length-1; x++) {
				hoverCard.splice();
			}
		}
		if (hoverCard.length === 1) {
			hoverCard.onBoard = true;
			break;	
		}
	}

	//moves cards in hand to holder - player 1
	if (p1hand.length > 0) {
		if (p1hand[0].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(p1hand[0].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(p1hand[0].asset, {
				x: hold1.position.x,
				y: hold1.position.y
			})
		}
	}
	if (p1hand.length > 1) {
		if (p1hand[1].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(p1hand[1].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(p1hand[1].asset, {
				x: hold2.position.x,
				y: hold2.position.y
			})
		}
	}
	//player2
	if (p2hand.length > 0) {
		if (p2hand[0].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(p2hand[0].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(p2hand[0].asset, {
				x: hold3.position.x,
				y: hold3.position.y
			})
		}
	}
	if (p2hand.length > 1) {
		if (p2hand[1].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(p2hand[1].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(p2hand[1].asset, {
				x: hold4.position.x,
				y: hold4.position.y
			})
		}
	}
	//table
	if (tableHand.length > 0) {
		if (tableHand[0].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(tableHand[0].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(tableHand[0].asset, {
				x: table1.position.x,
				y: table1.position.y
			})
		}
	}
	if (tableHand.length > 1) {
		if (tableHand[1].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(tableHand[1].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(tableHand[1].asset, {
				x: table2.position.x,
				y: table2.position.y
			})
		}
	}
	if (tableHand.length > 2) {
		if (tableHand[2].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(tableHand[2].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(tableHand[2].asset, {
				x: table3.position.x,
				y: table3.position.y
			})
		}
	}
	if (tableHand.length > 3) {
		if (tableHand[3].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(tableHand[3].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(tableHand[3].asset, {
				x: table4.position.x,
				y: table4.position.y
			})
		}
	}
	if (tableHand.length > 4) {
		if (tableHand[4].asset !== cardBeingDragged) {
			Matter.Body.setVelocity(tableHand[4].asset, {
				x: 0,
				y: 0
			})
			Matter.Body.setPosition(tableHand[4].asset, {
				x: table5.position.x,
				y: table5.position.y
			})
		}
	}
	
	//card glues to holder
	for (let i = 0; i < shuffledDeck.length; i++) {
		if (p1hand.length === 0) {
			if (shuffledDeck[i].asset.position.x <= hold1.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= hold1.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= hold1.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= hold1.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: hold1.position.x,
						y: hold1.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					p1hand.push(shuffledDeck[i]);
				}
			}
		} 
		if (p1hand.length === 1) {
			if (shuffledDeck[i].asset.position.x <= hold2.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= hold2.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= hold2.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= hold2.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: hold2.position.x,
						y: hold2.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					p1hand.push(shuffledDeck[i]);
				}
			}
		}
		if (p2hand.length === 0) {
			if (shuffledDeck[i].asset.position.x <= hold3.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= hold3.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= hold3.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= hold3.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: hold3.position.x,
						y: hold3.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					p2hand.push(shuffledDeck[i]);
				}
			}
		}
		if (p2hand.length === 1) {
			if (shuffledDeck[i].asset.position.x <= hold4.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= hold4.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= hold4.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= hold4.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: hold4.position.x,
						y: hold4.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					p2hand.push(shuffledDeck[i]);
				}
			}
		}
		if (tableHand.length === 0) {
			if (shuffledDeck[i].asset.position.x <= table1.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= table1.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= table1.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= table1.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: table1.position.x,
						y: table1.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					tableHand.push(shuffledDeck[i]);
				}
			}
		}
		if (tableHand.length === 1) {
			if (shuffledDeck[i].asset.position.x <= table2.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= table2.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= table2.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= table2.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: table2.position.x,
						y: table2.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					tableHand.push(shuffledDeck[i]);
				}
			}
		}
		if (tableHand.length === 2) {
			if (shuffledDeck[i].asset.position.x <= table3.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= table3.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= table3.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= table3.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: table3.position.x,
						y: table3.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					tableHand.push(shuffledDeck[i]);
				}
			}
		}
		if (tableHand.length === 3) {
			if (shuffledDeck[i].asset.position.x <= table4.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= table4.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= table4.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= table4.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: table4.position.x,
						y: table4.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					tableHand.push(shuffledDeck[i]);
				}
			}
		}
		if (tableHand.length === 4) {
			if (shuffledDeck[i].asset.position.x <= table5.bounds.max.x+5 && shuffledDeck[i].asset.position.x >= table5.bounds.min.x-5) {
				if (shuffledDeck[i].asset.position.y <= table5.bounds.max.y+5 && shuffledDeck[i].asset.position.y >= table5.bounds.min.y-5) {
					Matter.Body.setPosition(shuffledDeck[i].asset, {
						x: table5.position.x,
						y: table5.position.y
					})
					Matter.Body.setVelocity(shuffledDeck[i].asset, {
						x: 0,
						y: 0
					})
					tableHand.push(shuffledDeck[i]);
				}
			}
		}
	}


	requestAnimationFrame(cycle)
}
requestAnimationFrame(cycle)

Events.on(mouseConstraint, "startdrag", function (event) {
	cardBeingDragged = event.body;
})
Events.on(mouseConstraint, "enddrag", function (event) {
	cardBeingDragged = null;
})
Events.on(mouseConstraint, "mousemove", function (event) {
	
})
Events.on(mouseConstraint, "mousedownn", function (event) {
	
})

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);