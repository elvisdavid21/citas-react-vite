//Un componente debe empezar con la primera letra en mayuscula 
//tanto en el nombre del archivo como en el componente en si, ademas es una funcion

function Header() {

    return(
        <>
            <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
                Seguimiento Pacientes {''}
                <span className="text-indigo-600">Veterinaria</span>
            </h1>
        </>
    )
}

export default Header;