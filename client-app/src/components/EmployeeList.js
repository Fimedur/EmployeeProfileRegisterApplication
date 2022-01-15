import React from 'react';
import Employee from './Employee';
import axios from "axios";


export default function EmployeeList() {
    const employeeAPI = (url = 'http://localhost:52018/api/Employee') => {
        return{ 
            fatchAll: () => axios.get(url),
            crate: newRecord => axios.post(url, newRecord),
            update: (id, updatedrRecord) => axios.put(url+id, updatedrRecord),
            delete: id => axios.delete(url+id)
        }
    }

    const addOrEdit = (formData, onSucess) => {
        employeeAPI().crate(formData)
        .then(res => {
            onSucess();
        })
        .catch(err => console.log(err));  

    }
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Employee List</h1>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
               <Employee addOrEdit={addOrEdit}/>
            </div>
            <div className="col-md-8">
                <div>list of all employee Recorted</div>
            </div>
            
        </div>
    );
}
