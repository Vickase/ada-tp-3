
const modal = document.querySelector(".modal");

//Abrir modal 

const abrirModal = (abrirCard) => {
    let card = document.querySelector(`#${abrirCard}`);
    modal.classList.add("display");
    card.classList.add("display");
}

//Cerrar modal 
const botonCerrar = document.querySelectorAll(".closeBttn");

botonCerrar.forEach(button => {
    button.addEventListener("click", ()=>{
        let form = button.parentElement;
        form = form.parentElement;
        form.classList.remove("display");

        modal.classList.remove("display");
    });
});