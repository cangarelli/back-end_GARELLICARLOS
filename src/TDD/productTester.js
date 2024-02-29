// USER ERRORS
// Tiene que mandar credenciales.

// Las credenciales tienen que ser validas.
const productTest1 = () =>{
    console.log ("Test 1: Tiene que chequear si tiene credenciales validas.")
   
   
    
    if (esto) {
        return true
    } else {
        console.log ("Prueba 1 no pasdada")
        return false
    }                
}
// Tiene que tener permiso.
const productTest2 = () =>{
    console.log ("Test 2: Tiene que chequear si tiene permiso.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 2 no pasdada")
        return false
    }
}
// Tiene que enviar datos
const productTest3 = () =>{
    console.log ("Test 3: Tiene que chequear que se envian datos.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 3 no pasdada")
        return false
    }
}

// Tiene que enviar todos lo datos
const productTest4 = () =>{
    console.log ("Test 4: tiene que chequear que envía todos los datos.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 4 no pasdada")
        return false
    }
}

// Enviar todos los datos necesarios.
const productTest5= () =>{
    console.log ("Test 5: Tiene que todos los datos son correctos")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 5 no pasdada")
        return false
    }
}

// Tener un code unico
console.log ("Test 6: Tiene que tener un code que sea unico")
const productTest6= () =>{
    if (esto) {
        return true
    } else {
        console.log ("Prueba 6 no pasdada")
        return false
    }
}

const productTester = () =>{
    let testsOk = 0
    productTest1() == true && testsOk ++
    productTest2() == true && testsOk ++
    productTest3() == true && testsOk ++
    productTest4() == true && testsOk ++
    productTest5() == true && testsOk ++
    productTest6() == true && testsOk ++

    return `${testsOk} pruebas pasadas de 6`
}
module.exports = productTester


// SERVER ERRORS1

