import React, { useEffect, useState } from 'react';
import type {Electronics}  from '../../types/Types';
import { useDispatch,} from 'react-redux';
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
    id : new Date().getTime(),
    name: '',
    price: null,
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
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
    name: '',
    price: null,
    description: '',
  });
};

    return (
      <div style={{ padding: '2rem', backgroundColor: '#f2f2f2', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <form onSubmit={handleSubmit} style={{
          maxWidth: 400,
          margin: '0 auto',
          padding: '1.5rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price ?? ""}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Submit
          </button>
        </form>
      </div>
    );

};

export default React.memo(Create);
