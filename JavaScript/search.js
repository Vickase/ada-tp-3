//Buscar por texto
const filter = async()=>{
    let filteredList;
    const text = event.target.value;
    if (text==undefined) {
        imprimirList(employeeList);
    }
    try {
        const filtered = await axios.get(`${baseUrl}?search=${text}`);
        filteredList = filtered.data;
        imprimirList(filteredList);
    }catch (err){
        handleError;
    }
}

const search = document.querySelector("#buscador");
search.addEventListener("keyup", filter)