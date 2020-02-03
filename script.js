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
World.add(engine.world, [hold1, hold2, hold3, hold4])

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
	
	//body glues to holder
	for (let i = 0; i < shuffledDeck.length; i++) {
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
			}
		} 
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
			}
		}
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
			}
		}
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
			}
		}
	}


	requestAnimationFrame(cycle)
}
requestAnimationFrame(cycle)

Events.on(mouseConstraint, "startdrag", function (event) {
	
})
Events.on(mouseConstraint, "mousemove", function (event) {
	
})
Events.on(mouseConstraint, "mousedownn", function (event) {
	
})

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);