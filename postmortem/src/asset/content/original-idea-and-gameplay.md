# Original idea and gameplay

# Motivation

The theme was announced on august the 13th: **"LOST"**. I started to assemble things in my mind around this. I wanted to take the opportunity to learn about aframe, since it was a dedicated category this year.

I had this idea to push the limit of the 13k, adding as much as graphical content as possible. Something somehow coupled with the control offered by a VR based game.

It matured in something which takes place in a museum. Which will allow me to fit a lot of paintings in a big map if I succeed in minifing assets, or fallback to some rooms with a few paintings if not.

Then naturaly, I rushed into coding the cool stuffs. Leaving the game design things for later :)

# Image Crushing

In order to fit as much possible painting as possible, I used an algorithm to approximate the image with N disk of different radius and color.

I tried several settings, to minimize the number of disk while keeping the image recognizable.

The results are impresive ! With a few disk ( ~40 ) one should still recognize the painting.

![input](monalisa-64x64.png)
![output](monalisa-crushed-64x64.jpg)

_Mona Lisa, down to 40 circle of color is still recognizable_

I guess using widly known paintings helped. It's amazing that just by seeing the color palette, one can already guess what the painting is.

Let's leave aside the technical of asset minification for a while. I will explain it deeper in a [second post](/image-processing).

# Gameplay

At this point, I know that the approximation with colored disks is giving good results.

I experimented with a cool effect where the disks are drawn layer by layer. It's looking great and I wanted to integrate it in the game.

Starting from that, I imagined a game where you are send to find a special painting knowing only its names, you have to find it ( which implies that you are able to recognize it ) and are then given the next one to find. You progress from painting to painting until you reach the exit.

## Control

The cardboard only have one button, not so great for a walking simulator. I bound the button to move forward, in the eye direction. It's not very intuitive since you can not straff nor move backward, but it's playable. I lost my cardboard magnets soon after, so I did not test it very well.

On desktop, you can use the arrow keys or asdw, which is more convenient.

Other actions are completed by just looking to things.

> The device orientation is an awesome feature of AFRAME
> I started coding for desktop. When I reached a point, I said "ok now let's make it work on my phone, let the fun begin"
> And it was fun indeed! It worked right out of the box, with a responsiveness I never knew could be achieved on my 3 years old phone.
> Amazing

## Game design

Obviously, when someone say maze all I heard is procedural generation.

The earlier version did generate the maze. But It was frustrating to play because of the lack of open space, the asymetrical room and the long corridor. Toping with the painting spawning at difficult to access locations and it was a nightmare.

It might have been possible to have a nice generated map, but I realised I will take a huge amount of time. Of which I was already running low.

Instead, I decided to draw the map by hand in ascii art. I carefully place the most recognizable paintings first, in relatively closed area to guide the player at the begining.

![ascii world](ascii-world.jpg)

_The museum map, represented in ascii_

Well not carefully enougth I guess. I think a lot of peoples miss the point from the begining. Unfortunatelly, I did not have time for play testing session and submit a kind of confusing version of my game.

> I reworked some area a little since.
