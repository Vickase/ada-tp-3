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
        const employee = await axios.put(`${baseUrl}${id}`, info)//Como le pasamos el id?
        for ( let i=0; i < employeeList.length; i++) {
            if ( employeeList[i].id == id) {
                employeeList[i] = employee.data;
            }
        }

       getEmployees();
    }
    catch (err){
        handleError(err);
    }
}

const submitUpdtButton = document.querySelector("#submitUpdt");
submitUpdtButton.addEventListener("click", ()=>{
    editEmployee(currentId, fullnameUpd.value, emailUpd.value, addressUpd.value, phoneUpd.value);
});