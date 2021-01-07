import React from "react";
import { useFormik } from "formik";

/**
 * A custom validation function. This must return an object
 * which keys are symmetrical to our values/initialValues
 * @param {object} values
 * @return {object} errors
 */
const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Required";
    } else if (values.name.length > 255) {
        errors.name = "Must be 255 characters or less";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = "Must be between 8 and 16";
    }

    if (!values.cPassword) {
        errors.cPassword = "Required";
    } else if (values.cPassword != values.password) {
        errors.cPassword = "Must be same as password";
    } else if (values.cPassword.length < 8 || values.cPassword.length > 16) {
        errors.cPassword = "Must be between 8 and 16";
    }

    if (!values.phone) {
        errors.phone = "Required";
    } else if (isNaN(values.phone) || values.phone.length != 12) {
        errors.phone = "Invalid phone number. Eg. 959XXXXXXXXX";
    }

    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Required";
    }

    if (!values.address) {
        errors.address = "Required";
    } else if (values.address.length > 255) {
        errors.address = "Must be 255 characters or less";
    }

    return errors;
};

const UserCreateForm = ({ handleSubmit, handleProfile }) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cPassword: "",
            type: 1,
            phone: "",
            dateOfBirth: "",
            address: ""
        },
        validate,
        onSubmit: values => {
            handleSubmit(values);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row mb-2">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                <div className="txt-error">
                    {formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                <div className="txt-error">
                    {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                <div className="txt-error">
                    {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="cPassword" className="form-label">
                    Confirm Password
                </label>
                <input
                    id="cPassword"
                    name="cPassword"
                    type="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cPassword}
                />
                <div className="txt-error">
                    {formik.touched.cPassword && formik.errors.cPassword
                        ? formik.errors.cPassword
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="type" className="form-label">
                    Type
                </label>
                <select
                    id="type"
                    name="type"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                >
                    <option value="0">Admin</option>
                    <option value="1">User</option>
                </select>
            </div>

            <div className="row mb-2">
                <label htmlFor="phone" className="form-label">
                    Phone
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                />
                <div className="txt-error">
                    {formik.touched.phone && formik.errors.phone
                        ? formik.errors.phone
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                </label>
                <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                />
                <div className="txt-error">
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth
                        ? formik.errors.dateOfBirth
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="address" className="form-label">
                    Address
                </label>
                <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                />
                <div className="txt-error">
                    {formik.touched.address && formik.errors.address
                        ? formik.errors.address
                        : null}
                </div>
            </div>

            <div className="row mb-2">
                <label htmlFor="profile" className="form-label">
                    Profile
                </label>
                <input
                    id="profile"
                    name="profile"
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={event => handleProfile(event)}
                    onBlur={formik.handleBlur}
                />
                <div className="txt-error">
                    {formik.touched.profile && formik.errors.profile
                        ? formik.errors.profile
                        : null}
                </div>
            </div>
            <button type="submit" className="btn btn-primary mb-5">
                Submit
            </button>
        </form>
    );
};

export default UserCreateForm;