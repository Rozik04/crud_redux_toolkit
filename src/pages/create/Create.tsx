import React, { useEffect, useState } from 'react';
import type { Electronics } from '../../types/Types';
import { useDispatch } from 'react-redux';
import { createdItems } from '../../redux/features/create';

const Create = () => {
  const dispatch = useDispatch();

  const [parsedData, setParsedData] = useState<Electronics[]>(() => {
    const data = localStorage.getItem('created');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('created', JSON.stringify(parsedData));
  }, [parsedData]);

  const [formData, setFormData] = useState<Electronics>({
    id: new Date().getTime(),
    fname: '',
    lname: '',
    age: null,
    username: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { ...formData, id: new Date().getTime() };
    const updated = [...parsedData, newItem];
    dispatch(createdItems(newItem));
    setParsedData(updated);

    setFormData({
      id: new Date().getTime(),
      fname: '',
      lname: '',
      age: null,
      username: '',
      password: '',
      phoneNumber: '',
    });
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor:'white',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        maxWidth: 500,
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
      }}>
        {[
          { label: 'First Name', name: 'fname', required: true },
          { label: 'Last Name', name: 'lname', required: true },
          { label: 'Age', name: 'age', type: 'number', required: true },
          { label: 'Username', name: 'username', required: true },
          { label: 'Password', name: 'password', type: 'password', required: true },
          { label: 'Phone Number', name: 'phoneNumber', required: false },
        ].map(({ label, name, type = 'text', required }) => (
          <div key={name} style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              {required && <span style={{ color: '#f9d342' }}>*</span>} {label}
            </label>
            <input
              type={type}
              name={name}
              value={(formData as any)[name] ?? ''}
              onChange={handleChange}
              required={required}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '1rem',
                transition: 'border 0.3s',
              }}
            />
          </div>
        ))}

        <button type="submit" style={{
          width: '100%',
          padding: '0.9rem',
          backgroundColor: '#f9d342',
          color: '#1e1e2f',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default React.memo(Create);
