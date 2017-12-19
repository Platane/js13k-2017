I stored game data as binary to save some space.

I have a good amount of game data which consist of item with position, color and size. Storing it as JSON is quite inefficient. Instead I convert them to binary data.
This may seems trivial if you came from a low level language, but it requires a few tricks in Js.

first step, instead of primitive number, I use just the right amount of bit to represent an object:

```
 #### #### #### | #### #### | #### | ##

    position        color    radius  opacity
```

Each # is a bit, allowing to effectively store one item as 26 bits.

second step. For each item, the 26 bits are concatenated. At this point I use an Uint8Array because the binary representation is quite long ( too long to fit in a number type )

It can be a bit painful to write in a Uint8Array. I wrote a helper.

```js
// write the number 'value' at the emplacement 'a' - 'b' in the Uint8Array 'arr'
const writeNumber = (a, b, arr, value) => {

  // iterate trough the bits reserved for the number
  for (let k = a; k < b; k++) {

    // get the bit to write at the position k
    // it's the bit at the position ( k - a ) from the value
    const bit = !!(value & (1 << (k - a)))

    // write the bit at the position k
    arr[Math.floor(k / 8)] += +bit << (k % 8)
  }
}
```

third step. We have a very long number as Uint8Array, Let's write it in a file.

It's possible to have it done from the browser:

```js
const typedArray = getUint8Array()

const file = new Blob([typedArray], {
  type: 'application/octet-binary',
  encoding: 'utf8',
})

const domButton = document.querySelector('a#myDownloadButton')

domButton.href = URL.createObjectURL(file)

domButton.download = 'myFileName.data'
```

It will download the file when the user click the button.
Note that it can also be done in node with `fs.writeFile`

Next, bundle the file in the game.
At the game start, the Uint8Array can be loaded with

```js
const arrayBuffer = await ( await fetch(fileUrl) ).arrayBuffer())

const typedArray = new Uint8Array(arrayBuffer)

```

Form there, apply is the inverse transformation: read the number at the correct emplacement in the Uint8Array, and rebuild the primitive object.

With this trick, I was able to store one low res image in ~130o. Same data is 2235o in json, 543o once gzip.
