import axios from "axios";
const BASE_URL = "http://localhost:4000";

export async function loginApi(userData) {
	const url = BASE_URL + "/user/login";
	try {
		const data = await axios.post(url, userData);
		// console.log(data.data.data);
		return { state: true, data: data.data.data };
	} catch (error) {
		console.log(error.response.data);
		return { state: false, data: error.response.data };
	}
}

export async function signupApi(userData) {
	const url = BASE_URL + "/user/signup";
	try {
		const data = await axios.post(url, userData);
		return { state: true, data: data.data.data };
	} catch (error) {
		console.log(error.response.data);
		return { state: false, data: error.response.data };
	}
}

export async function getAllBooksApi(token, queryParam) {
	const url = `${BASE_URL}/books/${queryParam ? "?" + queryParam : ""}`;

	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		const data = await axios.get(url, { headers });
		return { state: true, data: data.data.data };
	} catch (error) {
		console.log(error.response.data);
		return { state: false, data: error.response.data };
	}
}

export async function addBookApi(token, bookData) {
	const url = BASE_URL + "/books/create";
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		await axios.post(url, bookData, { headers });
		// console.log(data);
	} catch (error) {
		console.log(error.response.data);
	}
}

// export async function getBookApi(token, _id) {}

export async function editBookApi(token, _id, bookData) {
	const url = BASE_URL + "/books/update/" + _id;
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		await axios.patch(url, bookData, { headers });
		// console.log(data);
	} catch (error) {
		console.log(error.response.data);
	}
}

export async function deleteBookApi(token, _id) {
	const url = BASE_URL + "/books/delete/" + _id;
	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
	try {
		await axios.delete(url, { headers });
		// console.log(data);
	} catch (error) {
		console.log(error.response.data);
	}
}
