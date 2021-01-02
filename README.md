## Jump and Run Template

This is a template for jump and run games in Vanilla Javascript.

There are classes for

-   rectangles (which cannot be moved)
-   boxes (which can move / be moved)
-   players (which can walk and jump and push boxes)

In particular, the box class has some elementary physics (velocity, acceleration, gravity, friction), collision detection and traits such as pushing other boxes. Players are seen as special boxes which can be controlled via the arrow keys.

The animation is done by the timer class.
