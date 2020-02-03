
const fullnameUpd = document.querySelector("#update-fullname");
const emailUpd = document.querySelector("#update-email");
const addressUpd = document.querySelector("#update-address");
const phoneUpd = document.querySelector("#update-phone")
const employeeListHTML = document.querySelector(".employees-list-body");

const printList = (list) => {
    employeeListHTML.innerHTML = "";
    list.map(employee=>{ 
        
        let tr = document.createElement("tr");
        let checkboxTh= document.createElement("th");

        let span = document.createElement("span");
        let checkbox= document.createElement("input");
        checkbox.type="checkbox";
        span.appendChild(checkbox);
        checkboxTh.appendChild(span);        
        checkboxTh.classList.add="th-checkbox";        
        tr.appendChild(checkboxTh);

        let nameTh= document.createElement("th");
        nameTh.innerHTML = employee.fullname;
        tr.appendChild(nameTh);

        let emailTh= document.createElement("th");
        emailTh.innerHTML = employee.email;
        tr.appendChild(emailTh);        
        
        let addressTh= document.createElement("th");
        addressTh.innerHTML = employee.address;
        tr.appendChild(addressTh);        
        
        let phoneTh= document.createElement("th");
        phoneTh.innerHTML = employee.phone;
        tr.appendChild(phoneTh);        

        let actionsTh= document.createElement("th");
        actionsTh.classList = "action-th"
        
        let spanDelete = document.createElement("span");
        spanDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        spanDelete.addEventListener("click",()=>{
            tr.parentNode.removeChild(tr);
            deleteEmployee(employee.id);
        })

        let spanEdit = document.createElement("span");
        spanEdit.innerHTML = `<i class="fa fa-edit"></i>`;
        spanEdit.addEventListener("click", ()=>{
            abrirModal("modificar-usuario");
            fullnameUpd.value = employee.fullname;
            emailUpd.value= employee.email;
            addressUpd.value=employee.address;
            phoneUpd.value=employee.phone;
            currentId = employee.id;     
        })
        
        actionsTh.appendChild(spanDelete);
        actionsTh.appendChild(spanEdit);
        tr.appendChild(actionsTh);

        tr.classList.add("employees-list-item");
        employeeListHTML.appendChild(tr);
    })

    
};
