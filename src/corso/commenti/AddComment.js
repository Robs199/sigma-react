import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {CommentiService} from './CommentiService'
const{createComment}= new CommentiService();

export const AggiungiCommento = () => {
    const emptyComment = {
        id: null,
        postId: '',
        name: '',
        email: '',
        body: ''
    };
    const [comment, setComment] = useState(emptyComment)
    const toast = useRef(null);
   
    
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _comment = { ...comment };
        _comment[`${name}`] = val;
        setComment(_comment);
    }
    const saveComment=()=>{
        createComment(comment);
        setComment(emptyComment);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Comment Added', life: 3000 });
    }
    return (
      
        <>
            <h1>New Comment</h1>
            <div className="card">
                <div className="p-fluid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                    <Toast ref={toast} />
                        <span className="p-float-label">
                            <InputText id="postId" value={comment.postId} onChange={(e) => onInputChange(e, 'postId')} required  />
                            <label htmlFor="postId">post ID</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label p-input-icon-left">                          
                            <InputText id="name" value={comment.name} onChange={(e) => onInputChange(e, 'name')} required/>
                            <label htmlFor="name">Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label p-input-icon-right">
                            <InputText id="email" value={comment.email} onChange={(e) => onInputChange(e, 'email')} required/>
                            <label htmlFor="email">Email</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputTextarea id="body" value={comment.body} rows={5} cols={30} autoResize onChange={(e) => onInputChange(e, 'body')} required/>
                            <label htmlFor="body">Body</label>
                        </span>
                    </div>
                </div>
                <Link to='/commenti'>  <Button label="Cancel" icon="pi pi-times" className="p-button-text"/></Link>
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveComment} />
            </div>
            <br />
        </>
    )
}