"use strict"
document.addEventListener('DOMContentLoaded', () => {

    /*----------------------------  constantes  ----------------------------*/
    const baseURL = 'https://66706abd0900b5f8724a9468.mockapi.io/hospedajes/hospedajes';
    const msj = document.querySelector("#resultadoCargaHospedaje");
    const bodyTable = document.querySelector("#serviceRequest");
    const formPost = document.querySelector(".formCargarHospedaje");
    const formEdit = document.querySelector(".formEdit");
    const InputID = document.querySelector("#IDHospedaje");
    const MODIFICAR_BTN = document.querySelector(".updateSubmit");
    const CANCELAR_BTN = document.querySelector(".cancel");
    const AVANZAR_BTN = document.querySelector("#avanzar");
    const RETROCEDER_BTN = document.querySelector("#retroceder");


    /*----------------------------  variables  ----------------------------*/
    let habilitado = true;
    let contadorPage = 1;
    let limite = 5;


    /*----------------------------  escuchas  ----------------------------*/
    formPost.addEventListener('submit', sendData);
    MODIFICAR_BTN.addEventListener('click', updateData);
    CANCELAR_BTN.addEventListener('click', () => {
        formEdit.classList.add('oculto');
    });

    AVANZAR_BTN.addEventListener('click', () => {
        if (habilitado) {
            contadorPage++;
            pagination();
        }
    });

    RETROCEDER_BTN.addEventListener('click', () => {
        if (contadorPage > 1) {
            contadorPage--;
            pagination();
        }
    });


    /*----------------------------  funciones  ----------------------------*/
    function updateDOM(json) {
        let itemsCargados = 0;
        bodyTable.innerHTML = " "; //Borramos lo previamente cargado, para que no se muesetee eso tambien en la tabla.
        for (const hospedaje of json) {
            let contacto = hospedaje.contacto;
            let direccion = hospedaje.direccion;
            let categoria = hospedaje.categoria;
            let id = hospedaje.id;

            bodyTable.innerHTML += `  
                <tr id = "row-${id}">
                    <td>${contacto}</td>
                    <td>${direccion}</td>
                    <td>${categoria}</td>
                    <td><button class="btn-delete" data-id="${id}">eliminar</button></td>
                    <td><button class="btn-edit" data-id="${id}">editar</button></td>
                </tr>
            `;

            itemsCargados++;

        }

        if (itemsCargados < limite) {//para habilitar el boton avanzar
            habilitado = false;
        } else {
            habilitado = true;
        }

        addEvenDelete();
        addEventUpdate();
    }

    function addEvenDelete() {

        let btn_delete = document.querySelectorAll(".btn-delete");
        for (let i = 0; i < btn_delete.length; i++) {//recorro todos los botones eliminar

            let id = btn_delete[i].dataset.id;//obtengo los id de los elementos en la tabla
            btn_delete[i].addEventListener('click', () => {//les agrego el evento escuchar click a los botones

                deleteItem(id);//le asigno una funcion 
            });
        }
    }

    function addEventUpdate() {

        let btn_update = document.querySelectorAll(".btn-edit");
        for (let i = 0; i < btn_update.length; i++) {//recorro todos los botones editar

            let id = btn_update[i].dataset.id;//obtengo los id de los elementos en la tabla
            btn_update[i].addEventListener('click', () => {//les agrego el evento escuchar click a los botones

                mostrarFormulario(id);//le asigno una funcion 
            });
        }
    }

    function mostrarFormulario(id) {
        formEdit.classList.toggle('oculto');
        InputID.value = id;
    }


    /*----------------------------  funciones ASYNC/AWAIT ----------------------------*/
    async function deleteItem(id) {
        try {
            let response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const row = document.querySelector(`#row-${id}`);//eliminio de html la fila
                row.remove();
                msj.innerText = '!Elemento borrado exitosamente¡';
                
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error: hospedaje no eliminado');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            msj.innerText = `Error ${error.message}`;
        }
        setTimeout(function () {
            msj.innerText = '';//luego de cumplido el tiempo reseteo el elemento
        }, 2000);
    }

    async function updateData(event) {
        event.preventDefault();
        let id = InputID.value;
        let contacto = document.querySelector("#contactoFormEdit").value;
        let direccion = document.querySelector("#direccionFormEdit").value;
        let categoria = document.querySelector("#categoriaFormEdit").value;

        let hospedaje = {
            contacto: contacto,
            direccion: direccion,
            categoria: categoria
        };
        try {
            let response = await fetch(`${baseURL}/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hospedaje),
            })
            if (response.ok) {
                pagination();
                msj.innerText= `Hospedaje modificado correctamente`;
                formEdit.classList.toggle('oculto');
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error: hospedaje no modificado');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            msj.innerText = `Error ${error.message}`;
        }
        setTimeout(function () {
            msj.innerText = '';//luego de cumplido el tiempo reseteo el elemento
        }, 2000);
    }

    async function sendData(event) {
        event.preventDefault();
        let id = InputID.value;
        let contacto = document.querySelector("#contacto").value;
        let direccion = document.querySelector("#direccion").value;
        let categoria = document.querySelector("#categoria").value;

        let hospedaje = {
            contacto: contacto,
            direccion: direccion,
            categoria: categoria
        };

        try {
            let response = await fetch(baseURL, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hospedaje)
            });

            if (response.ok) {
                let json = await response.json();
                formPost.reset();
                msj.innerText = '¡Elemento Agregado con éxito!';
                pagination();
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error: hospedaje no enviado');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }
        } catch (error) {
            msj.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            msj.innerText = '';
        }, 2000);
    }


    /*----------------------------  ITEMS OPCIONALES ----------------------------*/
    async function pagination() {
        //funcionna como metodo get.
        let url = new URL(baseURL);

        url.searchParams.append('page', contadorPage);
        url.searchParams.append('limit', limite);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            });
            if (response.ok) {
                let json = await response.json();
                updateDOM(json);
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error 404 - URL no encontrada');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                    }
                    
                }
            } catch (error) {

            msj.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            msj.innerText = '';
        }, 2000);
    }

    // FILTRADO
    let inputSearch = document.querySelector('#inputSearch');
    let parrafoSearch = document.querySelector('#parrafoSearch');
    inputSearch.addEventListener("change", filterHospedaje);

    async function filterHospedaje() {
        let palabraBuscada = inputSearch.value;
        let url = new URL(baseURL);
        url.searchParams.append("categoria", palabraBuscada);
        try {
            let response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                parrafoSearch.innerText = "Servicio encontrado"
                let json = await response.json();
                updateDOM(json);
            } else {
                switch (response.status) {
                    case 404:
                        throw new Error('Error: hospedaje no encontrado');
                    case 500:
                        throw new Error('Error 500 - Error interno del servidor');
                    default:
                        throw new Error(`Error ${response.status} - ${response.statusText}`);
                }
            }

        } catch (error) {
            parrafoSearch.innerText = `Error: ${error.message}`;
        }
        setTimeout(function () {
            parrafoSearch.innerText = '';
        }, 2000);
    }

    pagination();
});

