import React, { useState } from 'react';

function Form() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    function showMeTheInfo(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
}

function validate(name, value) {
    const newErrors = { ...errors };
    switch (name) {
        case "name":
            if (value.length < 2) {
                newErrors[name] = "Name must be at least 2 characters";
        }   else {
                delete newErrors[name];
            }
        break;
        case "email":
            if (value.length < 5) {
                newErrors[name] = "Email must be at least 5 characters";
        }   else {
                delete newErrors[name];
            }
        break;
        case "password":
        case "confirmPassword":
            if (value.length < 8) {
                newErrors[name] = "Password must be at least 8 characters";
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            } else {
                delete newErrors[name];
                delete newErrors.confirmPassword;
            }
        break;
    default:
        break;
    }
    setErrors(newErrors);
}

const hasErrors = Object.keys(errors).length > 0;

return (
    <form>
        <label>
            Name:
            <input type="text" name="name" onChange={showMeTheInfo} />
            {errors.name && <span>{errors.name}</span>}
        </label>
        <label>
            Email:
            <input type="email" name="email" onChange={showMeTheInfo} />
            {errors.email && <span>{errors.email}</span>}
        </label>
        <label>
            Password:
            <input type="password" name="password" onChange={showMeTheInfo} />
            {errors.password && <span>{errors.password}</span>}
        </label>
        <label>
            Confirm Password:
            <input type="password" name="confirmPassword" onChange={showMeTheInfo} />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </label>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Password: {formData.password}</p>
        <p>Confirm Password: {formData.confirmPassword}</p>
        {hasErrors && <p>Please fix the errors before submitting the form</p>}
    </form>
    );
}

export default Form;
