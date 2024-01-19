import { useStore } from "../context/DataProvider";
import { addBookApi, deleteBookApi, editBookApi } from "../context/api";

function getModalData({ type, data }) {
	switch (type) {
		case "DELETE":
			return { msg: "Are you sure want to delete ?", btn: "Delete" };

		case "ADD":
			return { msg: "Add New Book", btn: "Add", title: "", author: "" };
		case "EDIT":
			return {
				msg: "Edit Book Data",
				btn: "Update",
				title: data.title,
				author: data.author,
			};
		default:
			return { msg: "msg", btn: "btn", title: "title", author: "author" };
	}
}

function getFormData(e) {
	const formData = new FormData(e.target);
	return {
		title: formData.get("title"),
		author: formData.get("author"),
	};
}

export const Modal = ({
	values: { modalConfig, setModalConfig, updateParent },
}) => {
	const {
		store: {
			userData: { token },
		},
	} = useStore();
	const modalData = getModalData(modalConfig);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (modalConfig.type === "DELETE") {
			deleteBookApi(token, modalConfig.data._id);
		} else if (modalConfig.type === "ADD") {
			addBookApi(token, getFormData(e));
		} else if (modalConfig.type === "EDIT") {
			editBookApi(token, modalConfig.data._id, getFormData(e));
		}
		setModalConfig({ state: false });
		updateParent((p) => !p);
	};

	const handleClose = (e, close = true) => {
		e.stopPropagation();
		if (!close) return;
		setModalConfig({ state: false });
	};
	return (
		<div className="modal-container" onClick={handleClose}>
			<div className="modalBox" onClick={(e) => handleClose(e, false)}>
				<h3>{modalData.msg}</h3>
				<form onSubmit={handleSubmit}>
					{modalConfig.type !== "DELETE" && (
						<div className="gridForm">
							<label>Title</label>
							<input
								name="title"
								type="text"
								minLength="3"
								defaultValue={modalData.title}
								required
							/>
							<label>Author</label>
							<input
								name="author"
								type="text"
								minLength="3"
								defaultValue={modalData.author}
								required
							/>
						</div>
					)}

					<div className="button-panel">
						<div className="buttons-group">
							<button
								className="red"
								type="button"
								onClick={handleClose}
							>
								Cancel
							</button>
							<button className="blue" type="submit">
								{modalData.btn}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
