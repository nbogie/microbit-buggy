let pwmAmt = 0
let turnSpeed = 0
let rxCount = 0
input.onGesture(Gesture.ScreenDown, () => {
    radio.sendString("back")
})
input.onGesture(Gesture.ScreenUp, () => {
    radio.sendString("forward")
})
input.onGesture(Gesture.TiltLeft, () => {
    radio.sendString("left")
})
input.onGesture(Gesture.TiltRight, () => {
    radio.sendString("right")
})
input.onButtonPressed(Button.A, () => {
    radio.sendString("forward")
})
input.onButtonPressed(Button.B, () => {
    radio.sendString("stop")
    stopMotors();
})
input.onButtonPressed(Button.AB, () => {
    radio.sendString("back")
})
radio.onDataPacketReceived(({ receivedString }) => {
    rxCount += 1
    // bgLeds(""+rxCount)
    switch (receivedString) {
        case "left":
            left();
            break;
        case "ok":
            // pair awoke
            basic.showIcon(IconNames.Happy)
            basic.pause(1000)
            break;
        case "right":
            right();
            break;
        case "forward":
            fwd();
            break;
        case "back":
            backwd();
            break;
        case "stop":
            stopMotors();
            break;
        default:
            stopMotors();
            break;
    }
})
input.onGesture(Gesture.Shake, () => {
    radio.sendString("back")
})
turnSpeed = 40
function bgLeds(str: string) {
    control.inBackground(() => {
        basic.showString(str)
    })
}
radio.sendString("ok")
pwmAmt = 30
radio.setGroup(1)
function fwd() {
    bgLeds('F')
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, pwmAmt)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, pwmAmt)
    basic.pause(600)
    stopMotors();
}
function backwd() {
    bgLeds('B')
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, pwmAmt)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, pwmAmt)
    basic.pause(600)
    stopMotors();
}
function left() {
    bgLeds('L')
    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, turnSpeed)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, turnSpeed)
    basic.pause(300)
    stopMotors();

}
function right() {
    bgLeds('R')

    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, turnSpeed)
    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, turnSpeed)
    basic.pause(300)
    stopMotors();

}
function stopMotors() {
    kitronik.motorOff(kitronik.Motors.Motor1)
    kitronik.motorOff(kitronik.Motors.Motor2)
}
