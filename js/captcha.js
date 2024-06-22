"use stric"


document.addEventListener('DOMContentLoaded',()=>{
    let btnVerificar = document.querySelector("#verificar");
    btnVerificar.addEventListener('click', verificarCaptcha);
    let respuestaAcertada;

    function generarCaptcha() {
        let caracteres =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let num1 = Math.floor(Math.random() * caracteres.length);
        let num2 = Math.floor(Math.random() * caracteres.length); 
        let num3 = Math.floor(Math.random() * caracteres.length);
        let num4 = Math.floor(Math.random() * caracteres.length); 
        let num5 = Math.floor(Math.random() * caracteres.length);
        let num6 = Math.floor(Math.random() * caracteres.length);

        let captcha = document.querySelector("#captcha");
        captcha.innerHTML='Secuencia: ' + caracteres[num1] + caracteres[num2] + caracteres[num3] + caracteres[num4] + caracteres[num5] + caracteres[num6];
        respuestaAcertada = caracteres[num1] + caracteres[num2] + caracteres[num3] + caracteres[num4] + caracteres[num5] + caracteres[num6];
    }


    function verificarCaptcha(){
        let respuestaUsuario = document.querySelector("#respuesta").value;

        let msjDevolucion = document.querySelector("#devolucionCaptcha");

        if (respuestaUsuario === respuestaAcertada) {

            msjDevolucion.innerHTML='Respuesta correcta! No eres un robot.'
            let btnEnviar = document.querySelector("#btnEnviar");
            btnEnviar.classList.remove('oculto');
        }else{
            msjDevolucion.innerHTML='Respuesta incorrecta! vuelve a intentarlo.'
            generarCaptcha();
        }
    }

    window.onload = function(){
        generarCaptcha();
    }
});