#1. Say person clicks submit
#2. All these types of events can call an action creator, which returns an action
#3. Click ->Action Creator -> Action
Action Cretor - function that returns an object (type and payload).
That object is sent to all Reducers.
Reducers can choose to return a different peice of state.
That stat goes to app state, and pumped back into react app and causes all components to re-render.

Click Button -> 
	Action Creator -> 
		Object with type and data ( type: 'FETCH_GOAL', payload: goal)
	Action is the object, which gets'sent to ALL REDUCERS
  
	-> Reducers has switch statment, different line depending on type of action.

	What is returned ends up as new value of the state.  

	Once all reducers have processed all the action, new state goes to all containers.
	mapstatetoprops - state gets disection and sent to containers.


