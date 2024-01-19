import React, { useEffect, useState } from "react";
import { useStore } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { getAllBooksApi } from "../context/api";
import { Modal } from "../components/Modal";

function dateFormatter(date) {
	const dateObject = new Date(date);

	const options = {
		day: "2-digit",
		month: "short",
		year: "2-digit",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};
	return dateObject.toLocaleDateString("en-US", options);
}

export const Home = () => {
	const { store, dispatch } = useStore();
	const { userData: user } = store;
	const navigate = useNavigate();
	const [books, setBooks] = useState([]);
	// useEffect(() => {
	if (!store.userData.token) navigate("/login");
	// }, []);

	const [filterText, setFilterText] = useState("");
	const [filterBy, setFilterBy] = useState("");
	const [filterType, setFilterType] = useState("");
	const [sortBy, setSortBy] = useState({ key: "uploadedAt", asc: true });
	const [modalConfig, setModalConfig] = useState({ state: false });
	// odd way to update parent component
	const [updateState, updateParent] = useState(true);

	useEffect(() => {
		getAllBooksApi(user.token, filterType).then((data) => {
			if (data.state) {
				setBooks(data.data);
			} else {
				setBooks([]);
			}
		});
	}, [updateState, filterType]);

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/login");
	};
	const handlefilterText = (e) => {
		const value = e.target.value.toLowerCase();
		setFilterText(value);
	};
	const handleFilterBy = (e) => {
		const value = e.target.value;
		setFilterText("");
		setFilterBy(value);
	};
	const handleFilterType = (e) => {
		const value = e.target.value;
		setFilterType(value);
	};
	const handleModal = (type, data) => {
		setModalConfig({ state: true, type, data });
	};

	const handleSort = (key) => {
		const asc = sortBy.key === key ? !sortBy.asc : true;
		// console.log(sortBy, asc, key);

		const sortedBooks = [...books].sort((a, b) =>
			asc ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
		);
		setBooks(sortedBooks);
		setSortBy({ key, asc });
	};

	const filteredBooks = () => {
		return filterBy
			? books.filter((book) =>
					book[filterBy].toLowerCase().includes(filterText)
			  )
			: books;
	};

	return (
		<div className="container main-page">
			{modalConfig.state && (
				<Modal values={{ modalConfig, setModalConfig, updateParent }} />
			)}
			<div className="user-control box">
				<p>
					Hello, <span>{user.name}</span>
				</p>
				<button className="red" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className="control-box box">
				<div className="filter-control">
					<label>Filter by:</label>
					<select value={filterBy} onChange={handleFilterBy}>
						<option value="">Select</option>
						<option value="title">Title</option>
						<option value="author">Author</option>
					</select>
					<input
						type="text"
						value={filterText}
						onChange={handlefilterText}
						placeholder="enter text to search"
					/>
				</div>
				<div className="filter-control">
					<label>Filter type:</label>
					<select value={filterType} onChange={handleFilterType}>
						<option value={""}>Select</option>
						<option value={"new=1"}>New books</option>
						<option value={"old=1"}>Old books</option>
					</select>
				</div>
				{user.isCreator && (
					<div>
						<button
							className="blue"
							onClick={() => handleModal("ADD")}
						>
							Add New Book
						</button>
					</div>
				)}
			</div>

			<table className="box">
				<thead>
					<tr>
						<th onClick={() => handleSort("title")}>
							Title
							{sortBy.key === "title" && (
								<span>{sortBy.asc ? "▲" : "▼"}</span>
							)}
						</th>
						<th onClick={() => handleSort("author")}>
							Author
							{sortBy.key === "author" && (
								<span>{sortBy.asc ? "▲" : "▼"}</span>
							)}
						</th>
						<th onClick={() => handleSort("uploadedAt")}>
							Uploaded At
							{sortBy.key === "uploadedAt" && (
								<span>{sortBy.asc ? "▲" : "▼"}</span>
							)}
						</th>
						{user.isCreator && <th>Edit/Delete</th>}
					</tr>
				</thead>
				<tbody>
					{filteredBooks().map((book) => (
						<tr key={book._id}>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{dateFormatter(book.createdAt)}</td>
							{user.isCreator && (
								<td className="crud-flex">
									<button
										onClick={() =>
											handleModal("EDIT", book)
										}
									>
										Edit
									</button>
									<button
										className="red"
										onClick={() =>
											handleModal("DELETE", book)
										}
									>
										Delete
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
