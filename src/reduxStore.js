import { createStore, applyMiddleware } from 'redux'; 
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // local storage so stays in browserscache
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise'; 
import reduxThunk from 'redux-thunk';
import reducers from './reducers';


const persistConfig = {
  key: 'root',
  storage: storage,
  //whitelist: ['form', 'code', 'goal'] // only persist the form number
    whitelist: ['form', 'code'] // only persist the form number
};

const middlewares = [reduxPromise, reduxThunk, logger];

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
		persistedReducer,
		composeWithDevTools(
			applyMiddleware(...middlewares),
		)
	);

export const persistor = persistStore(store);


/*PERSIST STORE NOTES
- I pass the createStore function a persistedReducer that wraps the apps root reducer.  For my case because I have promises I had to use persistCombineReducers
- 



*/