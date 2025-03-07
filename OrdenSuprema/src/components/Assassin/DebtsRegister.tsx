import React, { useState } from "react";
import { NavBar } from "../../elements/NavBar";
import { Label, TextInput, Button, Dropdown, DropdownItem } from "flowbite-react";


export const DebtsRegister = () => {
    const assassins = [
        "Jack el Destripador", "Zodiaco", "Minero", "Ghostface",
        "Capry", "Jane Doe", "John Doe", "Marco Botton",
        "Pepito", "Juanito", "LaYile", "Arce la parce"
    ];

    const [formData, setFormData] = useState({
        deudor: "",
        justificacion: "",
    });

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleReset = () => {
        setFormData({
            deudor: "",
            justificacion: "",
        });
    };

    // Actualizar el estado cuando se seleccione un nombre del Dropdown
    const handleSelectName = (name) => {
        setFormData({ ...formData, deudor: name });
    };

    return (
        <>
            <NavBar user="assassin" />

            <div className="flex justify-center items-center mt-20">
                <h5 className="text-white font-bold text-2xl lg:text-5xl">
                    Registrar deuda
                </h5>
            </div>

            {/* Formulario de registro de deuda */}
            <div className="flex items-center justify-center min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl w-full bg-slate-900 dark:bg-gray-900 p-10 rounded-lg shadow-md"
                >
                    {/* Dropdown para seleccionar un nombre */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                            Selecciona un nombre:
                        </label>
                        <NameDropdown
                            names={assassins}
                            selectedName={formData.deudor}
                            onSelect={handleSelectName}
                        />
                    </div>

                    {/* Campo para la justificación de la deuda */}
                    <div className="mb-5">
                        <Label htmlFor="justificacion">Justificación de la deuda</Label>
                        <textarea
                            id="justificacion"
                            name="justificacion"
                            value={formData.justificacion}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            required
                            rows={4}
                            maxLength={500}
                        />
                    </div>

                    {/* Botones para registrar o cancelar */}
                    <div className="flex justify-center gap-4 mt-5">
                        <Button type="submit" outline gradientDuoTone="greenToBlue">
                            Registrar
                        </Button>
                        <Button type="button" outline gradientDuoTone="pinkToOrange" onClick={handleReset}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

// Componente Dropdown para seleccionar un nombre
function NameDropdown({ names, selectedName, onSelect }) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Filtrar nombres según la búsqueda
    const filteredNames = names.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Botón que abre/cierra el dropdown */}
            <button
                type="button"
                className="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedName || "Selecciona un nombre"}
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute left-0 w-full mt-2 bg-gray-800 text-white shadow-md rounded-lg z-50">
                    {/* Campo de búsqueda */}
                    <div className="p-2">
                        <TextInput
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-700 text-white"
                        />
                    </div>

                    {/* Lista de opciones */}
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredNames.length > 0 ? (
                            filteredNames.map((name) => (
                                <li
                                    key={name}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                                    onClick={() => {
                                        onSelect(name);
                                        setSearch(""); // Limpiar búsqueda
                                        setIsOpen(false); // Cerrar dropdown
                                    }}
                                >
                                    {name}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-400">No encontrado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
