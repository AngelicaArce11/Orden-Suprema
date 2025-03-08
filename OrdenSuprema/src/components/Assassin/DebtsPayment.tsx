import { useState, useEffect } from 'react';
import { TableElement } from "../../elements/Table";
import { ConfirmationModal } from "../../elements/ConfirmationModal";
import axios from "axios";

export const DebtsPayment = () => {
    // Estado para manejar el estado del modal de confimación
    const [openModal, setOpenModal] = useState(false);
    // Estado para manejar las deudas en las que el asesino es deudor
    const [debts, setDebts] = useState([]);
    // Estado para conocer el ID del usuario 
    const [IDUser, setIdUser] = useState(-1);
    // Estado para manejar los nombres de los acrededores
    const [names, setNames] = useState<string[]>([]);
    // Estado para manejar los archivos cargados
    const [files, setFiles] = useState<{ [key: number]: File | null }>({});
    // Estado para manejar la aceptacion de una mision, tiene el indice de la fila de la mision a aceptar
    const [accept, setAccept] = useState<number>();

    // Obtenemos los datos de la BD 
    useEffect(() => {

        const data = localStorage.getItem("user");
        const user = data ? JSON.parse(data) : null;
        if (!user || !user.id) return; // Validación para evitar errores si el usuario no existe

        axios
            .get(`http://localhost:3000/debt/${user.id}/debtor`)
            .then((response) => {
                setDebts(
                    response.data.map((debt: any) => ({
                        id: debt.id,
                        creditorId : debt.creditorId,
                        description: debt.description,
                        is_completed: debt.is_completed
                    })).filter((debt: any) => debt.is_completed === false)
                )
                setIdUser(user.id);
            }
            )
            .catch((error) => console.error("Error fetching debts:", error));
    }, []);

    // Metodo que permite conocer el nombre del asesino
    const namePerson = async (id: number) => {
        if (!names[id]) {  
            const { data } = await axios.get(`http://localhost:3000/UserById/${id}`);
            setNames(prev => ({ ...prev, [id]: data.name }));    
        }
    };

    // Obtener los nombres de los acreedores
    useEffect(() => {
        debts.forEach(({ creditorId }) => {
            namePerson(creditorId);
        });
    }, [debts]);

     // Este metodo sirve para obtener la fila de la mision que se esta aceptando
    const clickAccept = (row: number) => {
        setAccept(row);
        setOpenModal(true);
    };

    // Función para manejar la carga de archivos
    const handleFileChange = (rowIndex: number, file: File | null) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [rowIndex]: file, // Asociamos el archivo con la fila correspondiente
        }));
        console.log(`Archivo subido en la fila ${rowIndex}:`, file);
    };

    const toggleModal = () => setOpenModal((prev) => !prev);

    const handleUpload = async (rowIndex: number) => {

        const image = files[rowIndex]
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try {
            await axios.put(`http://localhost:3000/debt/pay/${debts[rowIndex].id}`,  formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Deuda pagada con éxito");
            setOpenModal(false);
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            setOpenModal(false);
        }
    };

    // Obtener los campos necesarios para la visualización
    let data = debts.map(({ creditorId, description, is_completed }) => [
        names[creditorId],
        description,
        is_completed ? "Completada" : "Sin completar"
    ]);

    return (
        <>
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'>
                    Pagar Deudas
                </h5>
            </div>

            {/* Tabla con las debts */}
            <div className='w-full pt-15 px-2 sm:px-15'>
                <TableElement
                    header={['Nombre del Acreedor', 'Descripción', 'Estado', 'Comprobante', '']}
                    data={data}
                    nameButton='Enviar'
                    colorButton='greenToBlue'
                    onClick={clickAccept}
                    showFileInput={true}
                    onFileChange={handleFileChange}
                />
            </div>


            {/* Modal de confirmación */}
            <ConfirmationModal
                open={openModal}
                onClose={toggleModal}
                onConfirm={() => accept !== undefined ? handleUpload(accept) : setOpenModal(false)}
            />
        </>
    );
}