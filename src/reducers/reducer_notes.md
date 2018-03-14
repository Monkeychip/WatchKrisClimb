
###Storing Data in Redux
Use object instead of storing an array.  Object based storage

Reducers cache application state.

//LOCAL STATE
use local state if only handled by that and it's children components.


//GLOBAL STATE REDUX
With Redux, we get a global store. This store lives at the highest level of your app and passes data down to all children. You connect to the global store with the connect wrapper and a mapStateToProps function.

A store holds the whole state tree of your application.
The only way to change the state inside it is to dispatch an action on it.

A store is not a class. It's just an object with a few methods on it.
To create it, pass your root reducing function to createStore.

GET APPLICATION STATE
-- need to connect Redux and React. Using React-Redux - connect 
-- Instead of Component, now you have a container. 
this.props.activities  

//END GOAL is that property activities shows up in containers.  You use react-redux.

//WHEN YOU USE MAPSTATETOPROPS
- whatever is return will show up as props inside of the container 


var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));