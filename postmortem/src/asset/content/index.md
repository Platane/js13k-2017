
Vernissage post mortem
====

This is a post-moterm for a game I wrote for the [2013 js13kgames event](..).

You can play the game [here](..)

# Motivation

The theme was announced on august the 13th, "LOST". I started to assemble things in my mind around this. I wanted to take the opportunity to learn about aframe, since it was a dedicated category this year.

I had this idea to push the limit of the 13k, adding as much as graphical content as possible. Something somehow coupled with the control offered by a VR based game.

It matured in something which takes place in a museum, which will allow me to fit a lot of paintings.

Then naturaly, I rushed into coding the cool stuffs. Leaving the game design things for later.

# Image Crushing

## inpiration

[Evolution of Mona Lisa](https://rogerjohansson.blog/2008/12/07/genetic-programming-evolution-of-mona-lisa/)


## Algorithm

Let's take a look at the algorithm.

It's 

### Overview of genetic Algorithm

Genetic programming is quite amazing. It's fun to explain because it relies on knowledge that every body learn in hight school. 

It's based on darwin evolution theory: Starting for a population of solution, let's mutate a litle the solution at each generation and keep the best ones.

In order to use it we must:
 - Have a way to determine if a solution is better than another.
 - Describe the "adn" of a solution, a structure of data of quantified which can be altered.
 - Explicit how the solution adn mutate, to result in a slightly different solution.

> include refs


### data structure

To begin, we must define what is the "gene" of 


First there is a preparation phase.
I manually crop and resize the image down to a 64x64 resolution.

> It will speed up the comparaison phase.



## Implementation

I started 

## post thought

The algorithm I use is not technically a genetic programming.

In a genetic programming, mutation are made on a pool of genes. The way you select the best, and keep the ones that are "not that great but may evolve latter" is critical to maintain a population which will avoid falling into local extremum.

If technically my algorithm is a genetic programming with a pool size of one gene.

Maybe I should have not give up on the genetic aspect this fast.



# Things which went well

 - image minification
 - aframe mobile support


# Things which did not

 - aframe entity- component based architecture
 - time management
    -
    
![alternative](//github.com/platane.png)