import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { UserService } from './UserService';
import {Post} from '../posts/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"
import { User } from 'corso/dipendenti';

const { getUsers, createUser, removeId, removeMultipleId, updateUser, getPost } = new UserService();
 const UsersList = () => {
  let match = useRouteMatch()
  const emptyUser = {
    id: null,
    name: '',
    email: '',
    username: '',
    zipcode: ''
  };

  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState(null)
  const [page, setPage] = useState({ first: 0, rows: 5, page: 0, pageCount: 0 });
  const [totalRecords, setTotalRecords] = useState(0)

  const [userDialog, setUserDialog] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const [submitted, setSubmitted] = useState(false);

  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const toast = useRef(null);

  const updateCommentsList = async () => {
    const { data, totalRecords } = await getUsers(page.page, page.rows)
    setUsers(data);
    setTotalRecords(totalRecords)
  }
  
  const ResponsiveTemplate = (header, field) => rowData => (
    <>
      <span className="p-column-title">{header}</span>
      {rowData[field]}
    </>
  )
  useEffect(() => {
    updateCommentsList()
  }, [page]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />

      </React.Fragment>
    )
  }
const showPosts=()=>{
  getPost(user.id);
  
}
  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  }

  const saveUser = () => {
    if (user.id) {
      updateUser(user);
    } else {
      createUser(user)
    }
    // let _users = users.filter(val => val.id === user.id);
    setSubmitted(true);
    setUserDialog(false);
    setUsers(emptyUser);
    updateCommentsList()
  }
  const deleteUser = () => {
    let _users = users.filter(val => val.id !== user.id);
    setUsers(_users);
    removeId(user.id);
    setDeleteUserDialog(false);
    setUser(emptyUser);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: user.name + ' Deleted', life: 3000 });
  }
  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  }

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  }
  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  }
  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  }
  const deleteSelectedUsers = () => {
    //map sugli utenti l+selezionati e prendere la query (ricreare la query) url id che gli passo con & id=5&id=6 la aggiungo alla query con la join
    selectedUsers.map(`http://localhost:3000/users/`)
    let _users = users.filter(val => !selectedUsers.includes(val)
    );
    setUsers(_users);
    users.forEach(e => removeMultipleId(e.id));
    selectedUsers.forEach(users => { removeMultipleId(`http://localhost:3000/users/${users.id}`) })

    setDeleteUsersDialog(false);
    setSelectedUsers(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
  }

  const editUser = (user) => {
    setUser({ ...user });
    setUserDialog(true);
  }
  const userDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
    </>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _user = { ...user };
    _user[`${name}`] = val;
    setUser(_user);

  }
  const deleteUserDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
      <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
    </>
  );
  const deleteUsersDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
    </>
  );
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
       
       <Link to={'users-crud/' + rowData.id +'/posts'}>
          <Button icon="pi pi-users" className="p-button-rounded p-button-info p-mr-2" /></Link>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editUser(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteUser(rowData)} />
       
        
      </div>
    );
  }
  return (
    <div className="p-grid crud-demo">
      <div className="p-col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={users}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value)}
            first={page.first}
            onPage={setPage}
            dataKey="id"
            paginator
            lazy
            totalRecords={totalRecords}
            rows={page.rows}
            rowsPerPageOptions={[2, 5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Stai visualizzando dal record {first} al record {last} di {totalRecords} utenti"
            emptyMessage="Non ci sono utenti."
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="name" header="Name" sortable body={ResponsiveTemplate('Name', 'name')} ></Column>
            <Column field="email" header="Email" sortable body={ResponsiveTemplate('Email', 'email')}></Column>
            <Column field="username" header="Username" sortable body={ResponsiveTemplate('Username', 'username')} ></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>

          <Dialog
            visible={userDialog}
            style={{ width: '450px' }}
            header="User Details"
            modal
            className="p-fluid"
            footer={userDialogFooter}
            onHide={hideDialog}
          >
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={user.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.name })} />
              {submitted && !user.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
            </div>
            <div className="p-field">
              <label htmlFor="username">Username</label>
              <InputText id="username" value={user.username} onChange={(e) => onInputChange(e, 'username')} required rows={3} cols={10} />
            </div>

          </Dialog>
        </div>
        <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {user && <span>Are you sure you want to delete <b>{user.name}</b>?</span>}
          </div>
        </Dialog>

        <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {user && <span>Are you sure you want to delete the selected users?</span>}
          </div>
        </Dialog>
      </div>
      <Switch>
     <Route path={`${match.path}/:id`}>
       <Post />
     </Route>
     </Switch>
    </div>
    
  )
}
export default UsersList;
