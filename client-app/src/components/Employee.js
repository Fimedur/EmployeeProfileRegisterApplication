import React,{useState, useEffect} from 'react';

const defaultImageSrc = '/img/image_placeholder.png'
const intitalFieldValues = {
    employeeId: 0,
    employeeName: '',
    occupation: '',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile:null
}

export default function Employee(props) {
     const{addOrEdit} = props;

    const [values,setValues] = useState(intitalFieldValues)
    const [errors,setErrors] = useState({})


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }


    const showPreview = e => {
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else
        {
            setValues({
                ...values,
                imageFile:null,
                imageSrc: defaultImageSrc
            })

        }
    }
    const validate = () =>{
        let temp={}
        temp.employeeName = values.employeeName ===""?false:true;
        temp.imageSrc = values.imageSrc===defaultImageSrc?false:true;
        setErrors(temp)
        return Object.values(temp).every(x=> x === true)

    }
    const resetForm = () =>{
        setValues(intitalFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

     const handleFormSubmit = e => {
         e.preventDefault();
         if(validate()){
            const formData = new FormData();
            formData.append('employeeId', values.employeeId)
            formData.append('employeeName', values.employeeName)
            formData.append('occupation', values.occupation)
            formData.append('occupation', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData,resetForm)
         }
     }

     


    const applyErrorClass = field =>((field in errors && errors[field]===false)?' invalid-field':'')
    return (
        <>
        <div>
            Employee From
        </div>
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <div className="card">
                <img src={values.imageSrc} className="card-img-top" alt=""/>
                <div className="card-body">
                    <div className="form-group">
                        <input type="file"accept="image/*" className={"form-control-file "+ applyErrorClass('imageSrc')}
                        onChange={showPreview} id="image-uploader"/>
                    </div>
                    <div className="form-group">
                        <input className={"form-control "+ applyErrorClass  ('employeeName')} type="text" placeholder="Employee Name" name="employeeName" 
                        value={values.employeeName}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Occupation" name="occupation" 
                        value={values.occupation}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-light">Submit</button>
                    </div>

                </div>
            </div>
            
        </form>
        </>
        
    );
}
