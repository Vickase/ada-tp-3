//Aca va el get ( el de todos y el individual)
const getEmployees = async() =>{
    try {
        const data = await axios.get(`${baseUrl}`);
        employeeList = data.data;
        printList(employeeList);
    }catch(err){
        handleError(err);
    }  
};

getEmployees();
