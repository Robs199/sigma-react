import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import {CommentiService} from './CommentiService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
export const Commenti=()=>{
const{getComments}=new CommentiService();
const[comments, setComments] = useState(0)
const[page, setPage]=useState({first:0, rows:5, page:0, pageCount:0})
//per visualizzare il totale dei record nella pagina
const [totalRecords, setTotalRecords] = useState(0);
//si aggiorna ogni volta che navighi nella pagina
const updateCommentiList = async()=>{
    const {data, totalRecords} = await getComments(page.page, page.rows);
    setComments(data);
    setTotalRecords(totalRecords);
}
useEffect(() =>{
    updateCommentiList()
},[page]);

//Per aggiungere i bottoni New ed elimina
const leftToolbarTemplate=()=>{
    return(
        <React.Fragment>
           <Link to='/commenti/create-comment'> <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2"></Button></Link>
        </React.Fragment>
    )
}


//Per fare un aggiunta

return(
    <>
    <Toolbar className='p-mb-4' left={leftToolbarTemplate}/>
<DataTable
value={comments}
first={page.first}
onPage={setPage}
dataKey="id"
paginator
lazy
totalRecords={totalRecords}
rows={page.rows}
rowsPerPageOptions={[5,10, 25,50]}
className='datatable-responsive'
paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
 currentPageReportTemplate="Stai visualizzando dal commento {first} al commento {last} di {totalRecords} commenti"
 emptyMessage="Non ci sono commenti."
>
<Column field="name" header="name" sortable></Column>
    <Column field="email" header="email" sortable ></Column>
    <Column field="body" header="Body" sortable ></Column>
</DataTable>
</>
)
}