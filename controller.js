let colour; // Instructions: Attach a PS3 controller and press the play button.
// PS3 Gamepad Demo.
let controllers = [];

function setupController() {

    window.addEventListener("gamepadconnected", function (e) {
        gamepadHandler(e, true);
        console.log(
            "Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index,
            e.gamepad.id,
            e.gamepad.buttons.length,
            e.gamepad.axes.length
        );
    });
    window.addEventListener("gamepaddisconnected", function (e) {
        console.log(
            "Gamepad disconnected from index %d: %s",
            e.gamepad.index,
            e.gamepad.id
        );

        gamepadHandler(e, false);
    });
}

let controlerX = 1800;
let controlerY = 180;


function gamepadHandler(event, connecting) {
    let gamepad = event.gamepad;
    if (connecting) {
        print("Connecting to controller " + gamepad.index);
        controllers[gamepad.index] = gamepad;
    } else {
        delete controllers[gamepad.index];
    }
}


function drawGamepad() {
    var gamepads = navigator.getGamepads();

    for (let i in controllers) {
        let controller = gamepads[i]; //controllers[i]

        if (controller.buttons) {
            for (let btn = 0; btn < controller.buttons.length; btn++) {
                let val = controller.buttons[btn];

                if (buttonPressed(val)) {

                    if (btn == 12) controlerY-=5 * gridModule; Ay-=5 * gridModule;
                    if (btn == 13) controlerY+=5 * gridModule; Ay+=5 * gridModule;
                    if (btn == 14) controlerX-=5 * gridModule; Ax-=5 * gridModule;
                    if (btn == 15) controlerX+=5 * gridModule; Ax+=5 * gridModule;
                    if (btn == 0) mousePressed();
                }
            }
        }
        /*
        if (controller.axes) {
          let axes = controller.axes;
          for (let axis = 0; axis < axes.length; axis++) {
            let val = controller.axes[axis];
            translate(dj, 0);
            fill("grey");
            stroke("white");
            rect(0, dx * 2, dx, dx * 4);
            noStroke();
            fill("yellow");
            rect(0, val * dx * 2 + 1 + dx * 4, dx, dx / 4);
            fill("white");
            text(nf(val, 0, 2), 0, dx * 8);
          }
        }
        */
    }
}

function buttonPressed(b) {
    if (typeof b == "object") {
        return b.pressed; // binary
    }
    return b > 0.9; // analog value
}
