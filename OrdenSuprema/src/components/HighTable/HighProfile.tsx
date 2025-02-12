import imagenOrden from '../../assets/img/orden.jpg'

export const HighProfile=()=> {
    return (
    <>
        <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imagenOrden})` }}>
            <div className="flex items-center justify-center h-full text-white">
                <h1 className="text-4xl font-bold">Orden Suprema</h1>
            </div>
        </div>
    </>
    )   
}
