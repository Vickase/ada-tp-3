/*Agregar usuario--- supuesto post*/


const openAddModal = document.querySelector("#botonAgregar");
openAddModal.addEventListener("click", () => {
    abrirModal("agregarUsuario");
});


const fullnameId = document.querySelector("#nombre");
const emailId = document.querySelector("#email");
const direcId = document.querySelector("#address");
const telId = document.querySelector("#phone");

const crearUsuario = async () => {
  let fullname = fullnameId.value;
  let email= emailId.value;
  let adress = direcId.value;
  let phone = telId.value;

  let user = {
    fullname,
    email,  
    adress,
    phone
  };

  try {
    const res = await axios.post(baseUrl, user);
    employeeList.push(res.data);
    printList(employeeList);
  } catch (err) {
    handleError(err);
  }
};

const submitBttn = document.querySelector("#submitAdd");
submitBttn.addEventListener("click", createEmployee);
