import { createContext, useContext, useReducer } from "react";

const DataContext = createContext();
const initialData = {
	userData: {},
	// booksData: {},
};
const getFromLocalStorage = () => {
	const data = localStorage.getItem("small-library-app");
	return data ? JSON.parse(data) : initialData;
};
const saveToLocalStorage = (data) => {
	localStorage.setItem("small-library-app", JSON.stringify(data));
};

const reducer = (state, action) => {
	switch (action.type) {
		case "USERDATA":
			return { ...state, userData: action.payload };
		// case "BOOKSDATA":
		// 	return { ...state, booksData: action.payload };
		case "LOGOUT":
			return initialData;
		default:
			return state;
	}
};
const DataProvider = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, getFromLocalStorage());
	saveToLocalStorage(store);
	console.log(store);
	return (
		<DataContext.Provider value={{ store, dispatch }}>
			{children}
		</DataContext.Provider>
	);
};

const useStore = () => {
	return useContext(DataContext);
};

export { DataProvider, useStore };
