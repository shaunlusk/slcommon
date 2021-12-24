# SL Common

Some common classes and functions used by Shaun's projects.
Documentation can be found [here](https://shaunlusk.github.io/slcommon/docs/index.html).

----

**NOTE**

Default build will export a bundle for the browser.  All classes will be placed in the 'SL' namespace in the window; as such all calls to constructors will need to prefix the class name with SL.
Example:

    var queue = new SL.PriorityQueue();
