import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export const ConfirmationModal = ({ open, onClose, onConfirm }) => (
    <Modal size="md" show={open} onClose={onClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
            <div className='text-center'>
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Esta acción no se puede deshacer, ¿Estás seguro de querer enviar este comprobante?
                </h3>
            </div>
            <div className="flex justify-center gap-4">
                <Button color="success" onClick={onConfirm}>
                    Sí, estoy seguro
                </Button>
                <Button color="failure" onClick={onClose}>
                    Cancelar
                </Button>
            </div>
        </Modal.Body>
    </Modal>
);
