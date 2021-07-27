import React, { useState, useEffect, useRef } from 'react';

import { InputText } from 'primereact/inputtext'
import { DipendenteService } from './DipendenteService'
import classNames from 'classnames';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
export const User = () => {
    const emptyUser = {
        nome: "",
        cognome: "",
    }
    const [user, setUser] = useState(emptyUser)
    const [submitted, setSubmitted] = useState(false);
    const [presenza, setPresenza] = useState('')
    const stato = async () => {

        const { getUsers } = new DipendenteService();
        const { data } = await getUsers(user.nome, user.cognome);
        console.log(data);
        setPresenza(data);
    }


  
    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${nome}`] = val;
        setUser(_user);

    }

    const nomeCognome = () => {
        return(
        <div>
             <Dialog
            visible={nomeCognome}
            style={{ width: '450px' }}
            header="User Details"
            modal
            className="p-fluid"
            
          >
            <h1>Ricerca dipendente</h1>
            
            Nome: <InputText id="nome" value={user.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.nome })} />
            <br />
            Cognome: <InputText id="cognome" value={user.cognome} onChange={(e) => onInputChange(e, 'cognome')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.cognome })} />
            <br />
            <Button label='Cerca' onClick={stato} />
            <pre >{presenza}</pre>
            </Dialog>
        </div>
        )

        }

    return (
        <>
        
            Ricerca tramite:
            <Button onClick={nomeCognome}>Nome e cognome</Button>
          

        </>
    )
}