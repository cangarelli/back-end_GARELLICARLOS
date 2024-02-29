//USER ERROR
// Tiene que mandar credenciales.

// Las credenciales tienen que ser validas.
const userTest1 = () =>{
    console.log ("Test 1: Tiene que chequear si tiene credenciales validas.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 1 no pasdada")
        return false
    }
}
// Tiene que tener permiso.
const userTest2 = () =>{
    console.log ("Test 2: Tiene que chequear si tiene permiso.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 2 no pasdada")
        return false
    }
}
// Tiene que enviar datos
const userTest3 = () =>{
    console.log ("Test 3: Tiene que chequear que se envian datos.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 3 no pasdada")
        return false
    }
}

// Tiene que enviar todos lo datos
const userTest4 = () =>{
    console.log ("Test 4: tiene que chequear que envía todos los datos.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 4 no pasdada")
        return false
    }
}

// Todos los datos tienen que estar correctos
const userTest5 = () =>{
    console.log ("Test 5: Tiene que chequear que todos los datos esten correctos.")
    if (esto) {
        return true
    } else {
        console.log ("Prueba 5 no pasdada")
        return false
    }
}


const userTester = () =>{
    let testsOk = 0
    userTest1() == true && testsOk ++
    userTest2() == true && testsOk ++
    userTest3() == true && testsOk ++
    userTest4() == true && testsOk ++
    userTest5() == true && testsOk ++
    return `${testsOk} pruebas pasadas de 5`
}
console.log ("Test 6")
console.log ("Test 7")
console.log ("Test 8")

module.exports = userTester
// SISTEM ERROR