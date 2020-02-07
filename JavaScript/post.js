//Acá va el post
const abrirModalAdd = document.querySelector("#botonAgregar");
abrirModalAdd.addEventListener("click", () => {
    abrirModal("add-employee");
});


const fullnameid = document.querySelector("#name");
const emailid = document.querySelector("#email");
const addressid = document.querySelector("#address");
const phoneid = document.querySelector("#phone");

const createEmployee = async () => {
  let fullname = fullnameid.value;
  let email = emailid.value;
  let address = addressid.value;
  let phone = phoneid.value;

  let user = {
    fullname,
    email,  
    address,
    phone
  };

  try {
    const res = await axios.post(baseUrl, user);
    getEmployees();
    fullnameid.value="";
    emailid.value="";  
    addressid.value="";
    phoneid.value="";
  } catch (err) {
    handleError(err);
  }
};

const submitBoton = document.querySelector("#guardarCamb");
submitBoton.addEventListener("click", async()=>{
  await createEmployee();  
  let card = submitBoton.parentElement.parentElement;
  cerrarModal(card);
});
