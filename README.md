## Jump and Run Template

Demo: https://jump-and-run-template.netlify.app

This is a template for jump and run games in Vanilla Javascript.

There are classes for

-   rectangles (which cannot be moved)
-   boxes (which can be moved by the player)
-   players (which can walk and jump and push boxes)

In particular, the box class has some elementary physics (velocity, acceleration, gravity, friction) and collision detection. Players are seen as special boxes which can be controlled via the arrow keys and have the trait of pushing boxes.

The animation is done by the timer class which is borrowed from [this repo](https://github.com/meth-meth-method/super-mario).
