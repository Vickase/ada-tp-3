const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

const baseUrl = "https://tp-js-2-api-wjfqxquokl.now.sh";

const fetchUsers = async q => {
  try {
    const res = await axios.get(
      !q ? `${baseUrl}/users` : `${baseUrl}/users?search=${q}`
    );
    const userData = res.data;
    userData.forEach(user => insertUserTable(user));
  } catch (err) {
    handleError(err);
  }
};


const insertUserTable = user => {
  const tablaBody = document.querySelector("#tabla-users > tbody");

  let tableRow = document.createElement("tr");
  let tdCheck = document.createElement("td");
  let tdName = document.createElement("td");
  let tdEmail = document.createElement("td");
  let tdAddress = document.createElement("td");
  let tdPhone = document.createElement("td");
  let tdActions = document.createElement("td");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "check";
  checkbox.id = "checkbox";

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;

  tdName.innerHTML = user.fullname;
  tdEmail.innerHTML = user.email;
  tdAddress.innerHTML = user.address;
  tdPhone.innerHTML = user.phone;

  const editIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");

  editIcon.innerHTML = "edit";
  deleteIcon.innerHTML = "delete";
  editIcon.setAttribute("class", "material-icons");
  deleteIcon.setAttribute("class", "material-icons");

  tdCheck.appendChild(checkbox);
  tdCheck.appendChild(label);
  tdActions.appendChild(editIcon);
  tdActions.appendChild(deleteIcon);

  tableRow.appendChild(tdCheck);
  tableRow.appendChild(tdName);
  tableRow.appendChild(tdEmail);
  tableRow.appendChild(tdAddress);
  tableRow.appendChild(tdPhone);
  tableRow.appendChild(tdActions);

  tablaBody.appendChild(tableRow);
};

window.addEventListener("load", event => {
  fetchUsers();
});

// ==================================================================

const onOpen = () => {
  const modalWindow = document.querySelector(".bg-modal");
  const modal = document.querySelector(".bg-modal > .modal-container");
  modalWindow.style.display = "flex";
  modalWindow.classList.add("fadeIn");
  modal.classList.add("fadeInDown");
  modalWindow.classList.remove("fadeOut");
  modal.classList.remove("fadeOutUp");
};

const onClose = () => {
  const modalWindow = document.querySelector(".bg-modal");
  const modal = document.querySelector(".bg-modal > .modal-container");
  modalWindow.classList.remove("fadeIn");
  modal.classList.remove("fadeInDown");
  modalWindow.classList.add("fadeOut");
  modal.classList.add("fadeOutUp");
  setTimeout(() => (modalWindow.style.display = "none"), 1000);
};

const newEmployeeBtn = document.querySelector("#new-employee");
newEmployeeBtn.addEventListener("click", onOpen);

const closeBtn = document.querySelector("#close-btn");
const cancelBtn = document.querySelector("#cancel-btn");
closeBtn.addEventListener("click", onClose);
cancelBtn.addEventListener("click", onClose);
