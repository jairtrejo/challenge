# Coding challenge
A simple coding challenge

The app is protected by a log in screen, and once inside you can keep a list of
your favorite things.

For state management I used my own microframework, [Madera](https://github.com/jairtrejo/madera)

It's pre-alpha stuff, I use it mostly for experimentation, but I though it
would be interesting to use it for this challenge.

The three main components are:

- Reducers, which transform the state when an action happens
- Connected React components, that subscribe to pieces of the state, and request
  hooks to notify the system when an action happens.
- Connected resources, for handling async stuff. They check the state to decide
  when something needs to be synced, and issue requests accordingly.

Connected resources are the weirdest. I thought "what if, instead of sending a
request in response to an action, I send it when the state looks out of sync?".
In that regard Resources are kind of like React components: they consume state
and generate actions. It's an interesting model for when you do a lot of syncing.
Using it for a login is probably stretching it, but it doesn't break!

Everything is tied together using BaconJS. I love being able to combine async
actions using powerful primitives like `skipDuplicates`, `debounce`, `merge`,
etc.

For the styling I used Tachyons, it's a great fit for component-based development,
the idea is you write flat classes that accomplish just one visual thing, and then
you style your components by combining them. It's... odd to write CSS without
selectors, just classes, but you end up with your visuals nicely colocated with
your components, and you can avoid repetition by writing components.

## Running
You must have [npm](http://www.npmjs.org) installed. From this directory run:

```
npm install
```

To install dependencies, and then:

```
npm run start
```

To start the development server. Go to `http://localhost:9966` to see it
in action.
