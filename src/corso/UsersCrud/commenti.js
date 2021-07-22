import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UserService } from './UserService';

export const Commenti =()=>{
    const [selectedComments, setSelectedComments] = useState(null)
    const [page, setPage] = useState({ first: 0, rows: 5, page: 0, pageCount: 0 });
    const{getComments}= new UserService();
const [comments, setComments] = useState([])
const [totalRecords, setTotalRecords] = useState(0)

    const updateUsersList = async() => {
        const { data, totalRecords } = await getComments(page.page, page.rows)
        setComments(data);
        setTotalRecords(totalRecords)
      }
    
      useEffect(() => {
        updateUsersList()
      }, [page]);
    
    const toast = useRef(null);
 
    let emptyComment = {
        id: null,
        title: '',
        body: '',
    };
    const [comment, setComment] = useState(emptyComment);
    const actionBodyTemplate = (rowData) => {
        return (


            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  />
            </div>
        );
    }
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Comments</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const openNew = () => {
        setComment(emptyComment);
      //  setSubmitted(false);
      //  setProductDialog(true);
    }
    
         

       
    


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        );
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === id) {
                index = i;
                break;
            }
        }
    }
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    return(
        <>
    <h1>Benvenuti a competenze per programmare</h1>
    <DataTable
            value={comments}
            selection={selectedComments}
            onSelectionChange={(e) => setSelectedComments(e.value)}
            first={0}
            onPage={setPage}
            dataKey="id"
            paginator
            lazy
            totalRecords={totalRecords}
            rows={page.rows}
            rowsPerPageOptions={[2, 5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Stai visualizzando dal record {first} al record {last} di {totalRecords} commenti"
            emptyMessage="Non ci sono commenti."
          >
   
    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
    <Column field="name" header="name" sortable></Column>
    <Column field="email" header="email" sortable ></Column>
    <Column field="body" header="Body" sortable ></Column>
    <Column body={actionBodyTemplate}></Column>
</DataTable>
</>
    );
}


