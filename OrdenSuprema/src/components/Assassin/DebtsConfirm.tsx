import React, { useState, useEffect } from "react";
import { NavBar } from "../../elements/NavBar";
import { TableElement } from "../../elements/Table2";
import { Dropdown, DropdownItem } from "flowbite-react";


const assassins = [
    {deudor: 'Jack el Destripador', acreedor: 'Zodiaco', descripcion: 'Deuda 1', estado: 'Incompleta', comprobante:''},
    {deudor: 'Zodiaco', acreedor: 'Jack el Destripador', descripcion: 'Deuda 2', estado: 'Incompleta', comprobante:''},
    {deudor: 'Darth Vader', acreedor: 'Jack el Destripador', descripcion: 'Deuda 3', estado: 'Incompleta', comprobante:''},
    {deduor: 'Chanci care picha', acreedor: 'Jack el Destripador', descripcion: 'Deuda 4', estado: 'Incompleta', comprobante:''},
    {deudor: 'Jack el Destripador', acreedor: 'Zodiaco', descripcion: 'Deuda 5', estado: 'Incompleta', comprobante:'dddd'},
]

export const DebtsConfirm = () => {
        const buttons = [
            {name: 'Aceptar', color: 'greenToBlue', onClick: () => console.log('Aceptar')},
            {name: 'Rechazar', color: 'pinkToOrange', onClick: () => console.log('Rechazar')}
        ]
    
    return (
        <>
            <NavBar user='assassin' />
            <div className='flex justify-center items-center mt-30'>
                <h5 className='text-white font-bold text-2xl lg:text-5xl'>
                    Confirmar deuda
                </h5>
            </div>

            {/* Tabla con los datos filtrados */}
            <div className='w-full pt-15 pr-4 pl-4 px-2 sm:px-30'> 
                <TableElement header={['Deudor', 'Acreedor', 'Descripción', 'Estado']} showModalColumn={true} data={assassins} buttons = {buttons} />
            </div>
        </>
    );
}