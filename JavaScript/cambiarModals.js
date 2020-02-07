
const modal = document.querySelector(".modal");

//Abrir modal 

const abrirModal = (openCard) => {
    let card = document.querySelector(`#${openCard}`);
    modal.classList.add("display");
    card.classList.add("display");
}



//Cerrar modals 
const cerrarModal = (close) => {
    modal.classList.remove("display");
    close.classList.remove("display");
}


const botonesCerrar = document.querySelectorAll(".closeModal");
botonesCerrar.forEach(boton => {
    boton.addEventListener("click", ()=>{
        let form = boton.parentElement.parentElement;;
        cerrarModal(form);
    });
});

const botonesCancelar = document.querySelectorAll(".cancelar-camb");
botonesCancelar.forEach(boton => {
    boton.addEventListener("click", ()=>{
        let form = boton.parentElement.parentElement;
        cerrarModal(form);
    })
});