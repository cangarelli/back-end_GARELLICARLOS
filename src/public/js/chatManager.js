// let user 
console.log (user)
if (user) {
    swal.fire ({
        title: "Identificate",
        input: "text",
        text: "Ingresa un nombre de usuario",
        allowOutsideClick: false,
        inputValidator: value =>{
            return !value && "Necesitas escribir un nombre de usuario para continuar"
        }
    }).then( result =>{
        user = result.value
    })
}

