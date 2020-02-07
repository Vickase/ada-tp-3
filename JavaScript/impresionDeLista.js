
const fullName = document.querySelector("#fullname");
const fullEmail = document.querySelector("#fullemail");
const fullAddress = document.querySelector("#fulladdress");
const fullPhone = document.querySelector("#fullphone");
const employeeListHTML = document.querySelector(".cuerpo-tabla");
let currentId;


const imprimirList = (list) => {
    tablaGeneralHTML.innerHTML = "";
    list.map(employee=>{ 
        let tr = document.createElement("tr");
        
        let checkboxTh= document.createElement("th");

        let label = document.createElement("label");
        let checkbox= document.createElement("input");
        checkbox.type="checkbox";
        checkbox.className="checkbox";
        label.classList.add("label-checkbox");
        let icon = document.createElement("i");
        icon.className= `fa fa-check-square`;
        label.appendChild(checkbox);
        label.appendChild(icon);
        checkboxTh.appendChild(label);        
        checkboxTh.classList.add("th-checkbox");        
        tr.appendChild(checkboxTh);

        let nameTh= document.createElement("th");
        nameTh.innerHTML = employee.fullName;
        tr.appendChild(nameTh);

        let emailTh= document.createElement("th");
        emailTh.innerHTML = employee.fullEmail;
        tr.appendChild(emailTh);        
        
        let addressTh= document.createElement("th");
        addressTh.innerHTML = employee.fullAddress;
        tr.appendChild(addressTh);        
        
        let phoneTh= document.createElement("th");
        phoneTh.innerHTML = employee.fullPhone;
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
            abrirModal("modify-employee");
            fullname.value = employee.fullname;
            fullemail.value= employee.fullemail;
            fulladdress.value=employee.fullAddress;
            fullphone.value=employee.fullPhone;
            currentId = employee.id;     
        });
        
        actionsTh.appendChild(spanDelete);
        actionsTh.appendChild(spanEdit);
        tr.appendChild(actionsTh);

        tr.classList.add("employees-list-item");
        tablaGeneralHTML.appendChild(tr);
    })
};
