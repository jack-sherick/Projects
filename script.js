// module aliases
let Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Bounds = Matter.Bounds,
	Constraint = Matter.Constraint,
	Events = Matter.Events,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
	  wireframes: false,
	  width: 1400,
	  height: 800
    }
});

// add mouse input
let mouse = Mouse.create(render.canvas)
let	mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	collisionFilter: 0,	
	constraint: {
		stiffness: 0.0001,
		render: {
			visible: true
		}
	}
});
World.add(engine.world, mouseConstraint);

//keyboard input
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

let deck = [{
	suit: "",
	value: 0,
	onBoard: false,
	asset: null,
}]
for (let i = 1; i < 13; i++) {
	deck.push({
		suit: "spade",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: i,
			inertia: Infinity,
			render: {
				fillStyle: "green",
				lineWidth: 3,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < 13; i++) {
	deck.push({
		suit: "club",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: i+13,
			inertia: Infinity,
			render: {
				fillStyle: "green",
				lineWidth: 3,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < 13; i++) {
	deck.push({
		suit: "heart",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: i+26,
			inertia: Infinity,
			render: {
				fillStyle: "green",
				lineWidth: 3,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < 13; i++) {
	deck.push({
		suit: "diamond",
		value: i+1,
		asset: Matter.Bodies.rectangle(100, 100, 100, 140, {
			collisionFilter: i+39,
			inertia: Infinity,
			render: {
				fillStyle: "green",
				lineWidth: 1.5,
				strokeStlye: "black"
			}
		})
	})
}
for (let i = 1; i < deck.length; i++) {
	World.add(engine.world, deck[i].asset)
}

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
	min: { x: 0, y: 0 },
	max: { x: 1400, y: 800 }
});

Events.on(mouseConstraint, "mousedown", function (event) {
	console.log("REEEEE");
})

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);