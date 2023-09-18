import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const registerSchema = yup.object({
    name: yup.string()
        .required()
        .min(8)
        .max(40),
    mark: yup.mixed()
        .required()
        .test("valid-mark", "Invalid Mark", (value) => {
            if (value === undefined || value === null) return false;
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue) && /^\d+(\.\d{1})?$/.test(value);
        }),
    age: yup.number()
        .required()
        .min(16)
        .max(40),
    gender: yup.string()
        .required()
        .oneOf(["male", "female"])


})
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const FormRegister = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(registerSchema) })
    
    const handleSubmitAddForm = (data) => {
        const randomId = guidGenerator();
        data.id = randomId;
        data.createdAt = Date.now();
        data.updatedAt = Date.now();


        console.log(data);
        fetch("https://js-post-api.herokuapp.com/api/students", {
            method: "post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    return (

        <div className="container d-flex justify-content-center mt-2">

            <div className="row col-md-6 rounded">
                <h3 className="fw-bolder text-center mt-5">Add Student</h3>
                <form onSubmit={handleSubmit(handleSubmitAddForm)}>
                    <div>
                        <label className="form-label fw-bold">Name: </label>
                        <input type="text" placeholder="Enter name of student" className="form-control" {...register("name")} />
                    </div>
                    <span className="text-danger">{errors?.name?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Age: </label>
                        <input type="text" placeholder="Enter age of student" className="form-control"  {...register("age")} />
                    </div>
                    <span className="text-danger">{errors?.age?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Mark: </label>
                        <input type="text" placeholder="Enter mark of student" className="form-control"  {...register("mark")} />
                    </div>
                    <span className="text-danger">{errors?.mark?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Gender: </label>
                        <select className="form-select"  {...register("gender")}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label fw-bold">City: </label>
                        <select className="form-select"  {...register("city")}>
                            <option value="hn">hn</option>
                            <option value="hcm">hcm</option>
                            <option value="pt">pt</option>
                            <option value="dn">dn</option>
                        </select>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary me-3">Add</button>
                        <button type="button" className="btn btn-secondary" onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormRegister;