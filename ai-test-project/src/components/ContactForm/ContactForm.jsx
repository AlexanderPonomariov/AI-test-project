/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { setField, submitData, cleanData } from '../../slices/contactSlice';

function ContactForm() {
  const formData = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!validator.isEmail(formData.email)) newErrors.email = 'Enter a valid email';
    if (formData.message.trim().length < 10) newErrors.message = 'Message should be more than 10 characters';

    setErrors(newErrors);
  };

  const isFormValid = () => !Object.values(errors).some((error) => error);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cleanData());
    setIsSubmitted(true);
    if (isFormValid()) {
      dispatch(submitData());
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {isSubmitted && errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {isSubmitted && errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {isSubmitted && errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {isSubmitted && errors.message && <div className="error">{errors.message}</div>}
      </div>

      <button type="submit" disabled={isSubmitted && !isFormValid()}>Submit</button>
    </form>
  );
}

export default ContactForm;
