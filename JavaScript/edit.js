//Aca iria el PUT
const editEmployee = async (id, fullname, email, address, phone) => {

    try{            
        let info = {
            id,
            fullname, 
            email, 
            address, 
            phone
        };
        const employee = await axios.put(`${baseUrl}${id}`, info)//Como le pasamos el id?w
       getEmployees();
    }
    catch (err){
        handleError(err);
    }
}

const aceptar = document.querySelector("#guardarModif");
aceptar.addEventListener("click", async()=>{
   await editEmployee(currentId, 
                    fullName.value,
                    fullEmail.value,
                    fullAddress.value,
                    fullPhone.value);
    let card = aceptar.parentElement.parentElement;
    cerrarModal(card);

});