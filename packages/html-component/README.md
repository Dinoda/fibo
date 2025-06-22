# new-browser

## 

```html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <header>
        </header>
        <section id="main">
            <div data-fb data-fb-component="selection">
            </div>
        </section>
        <footer>
        </footer>
    </body>
</html>
```

## Dev

### Basic Principle

This is taking simple HTML files, with added "dataset" ("data-*" attributes) to describe the expected build result.

Wanting to build this as a whole line JS code, creating a whole system, from a pre-rendering, to a client-side rendering system, through a server-side rendering.

The objective is to keep a single logic in the whole process, while allowing to have all the different systems in the same files. 

This would allow to have simple html parts pre-rendered, rendering some specific server-side elements on request, then have client-side elements edited with this same system.

* Builder => The Building Class
    * IPattern => Pattern "Interface", used to define how the builder interact in specific ways with the building process
        * this is also the default rendering pattern service, used for the Client-side rendering
    * PRPattern => Used by default for the Pre-rendering of the pages, uses the "data-pr" attribute to define what is used
    * SSRPattern => Used by default for the server-side rendering of the pages, uses the "data-ssr" attribute to define the dom elements to manage

### Locking

As some systems will need to be used along others, you will be able to lock some part of the systems.

For example, by default, a PR system will be locked out of an element containing the "data-ssr" indicator, preventing it from going further into the element.

In some cases, you will need to use the PR system into a locked element, in this case, an option will be added to allow the system to go further into locked elements, until it encounters an element adapted to its system ("data-pr" attribute in the PR system's case).

This options is named "stopOnLock", and is set to "true" by default.
