import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ServicePost } from './ServicePost'
import { Path } from '../UsersCrud/index'

export const Post = () => {
  const { userId } = useParams();

 

  const { getPost } = new ServicePost();

  const [posts, setPosts] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState({ first: 0, rows: 5, page: 0, pageCount: 0 })
  const updateCommentsList = async () => {
    const { data, totalRecords } = await getPost(userId)
    setPosts(data);
    setTotalRecords(totalRecords)
  }
  useEffect(() => {
    updateCommentsList()
  }, [page]);
  return (
    <>
      <DataTable
        value={posts}
        first={page.first}
        onPage={setPage}
        dataKey="id"
        paginator
        lazy
        rows={page.rows}
        rowsPerPageOptions={[5, 10, 25, 50]}
        className='datatable-responsive'
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Stai visualizzando dal post {first} al post {last} di {totalRecords} commenti"
        emptyMessage="Non ci sono post."
      >
        <Column field="userId" header="User Id" sortable></Column>
        <Column field="title" header="Title" sortable></Column>
        <Column field="body" header="_Body" sortable></Column>
      </DataTable>
    </>
  )
}