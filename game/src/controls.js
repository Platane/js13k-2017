const down = [0, 0, 0, 0]
const updateDirection = k => e => {
    down[
        {
            '38': 0,
            '32': 0,
            '87': 0,

            '40': 2,
            '83': 2,

            '37': 1,
            '65': 1,

            '39': 3,
            '68': 3,
        }[e.which]
    ] = k

    const l = (down[0] | down[2]) & (down[1] | down[3]) ? Math.SQRT1_2 : 1

    world.control.direction.y = (down[0] - down[2]) * l
    world.control.direction.x = (down[1] - down[3]) * l
}

document.onkeydown = updateDirection(1)

document.onkeyup = updateDirection(0)

document.ontouchstart = e => (world.control.direction.y = 1)

document.ontouchend = e => (world.control.direction.y = 0)

// voice control

window.onload = () => {
    const { renderer } = document.getElementsByTagName('a-scene')[0]

    document.getElementById('m').onclick = () =>
        navigator.getUserMedia(
            { audio: 1 },
            stream => {
                // pipe the microphone input to a script node

                const audioContext = new AudioContext()

                const scriptNode = audioContext.createScriptProcessor(
                    4096,
                    1,
                    1
                )

                audioContext.createMediaStreamSource(stream).connect(scriptNode)

                // before the script node is connected to a desitination, it is un-active
                // active it
                // /!\ this behavior is for chrome only, in firefox the onaudioprocess is call even with no destination node
                scriptNode.connect(audioContext.destination)

                scriptNode.onaudioprocess = audioProcessingEvent => {
                    const pic = Math.max(
                        ...audioProcessingEvent.inputBuffer.getChannelData(0)
                    )

                    world.control.direction.y = pic > 0.16 ? 1 : 0
                }
            },
            _ => _
        )
}
