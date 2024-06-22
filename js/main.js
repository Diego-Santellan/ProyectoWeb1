"use strict"
document.addEventListener('DOMContentLoaded',()=>{

    /* FUNCION MENU HAMBURGUESA Y AJUSTAR CAMBIOS POR MEDIDAS DE PANTALLA */
    let btnMenu = document.querySelector('#btnMenu');
    btnMenu.addEventListener('click', cerrado);
    
    let nav = document.querySelector('#menu');//queda por fuera para no llamarlo dos veces
    function cerrado() {
        nav.classList.toggle('cerrado');
    }
    
    function ajustarPantalla(){    
        if(window.innerWidth>=768){
            nav.classList.remove('cerrado');//por si ajustan la pantalla sin la clase cerrado
        }else{
            nav.classList.add('cerrado');//para iniciar el programa con el menu cerrado
        }
    }
    
    window.addEventListener('load', ajustarPantalla);
    window.addEventListener('resize', ajustarPantalla);
});