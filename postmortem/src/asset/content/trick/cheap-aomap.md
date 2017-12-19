I made cheap ambient occlusion for a tiled map.

In order to make the illumination more credible, I use static ambient occlusion. This technique express the fact that ambient light comes from every direction. Therefore in a corner where most direction are obstructed (occluded), the ambient light is less powerful.

It looks like this ( on the floor ) :

![ao](https://platane.github.io/js13k-2017/postmortem/23ad107d.jpg)

At start, the map is a simple hand drawn ascii art. Which looks like this:

```

       ###################                                              
       #                 ##############           
       #                 #            ##########  
 #######   ##b#  ##b#    #            #        #  
 #     #                     #        #####    #  
 7                                             #  
 9                                             #  
 8     #                     #        ##########  
 #     #   ##t#  ##t#    #            #           
       #                 #            #           
       #                 ########  ####           
       #############   ##########  #       


```

In order to build the 3d world, for each wall tile ( the # ) I create a cube and set its position.

For the trick, I will need to use a large texture for the floor which cover all the world.

For every cell, I draw a square on the texture using a blur filter. This is easy to do as you can use a canvas as texture, and therefore are free to use the canvas 2d context API : `ctx.filter = 'blur(10px)'`
 
![aomap](https://platane.github.io/js13k-2017/postmortem/7a50ddaa.jpg)

When the 3d walls are placed over the floor, a nice shadow seems to cover the zone close to the wall.


