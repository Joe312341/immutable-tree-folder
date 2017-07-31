## Immutable Tree example

This is a tree folder built with ImmutableJS and React.

The underlying data structure is a Immutable.List containing nested Maps and Lists

By using immutability we can check if components need to be updated using shouldComponentUpdate

## Possible Improvements

Currently the tree nodes do not contain their respective paths. Instead the immutable data structure is traversed every time we toggle a node

# Run
1. Clone the repo
2. npm install
3. npm start

# Demo

View the demo [here](https://safe-brook-91423.herokuapp.com/)
