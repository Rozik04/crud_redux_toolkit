import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux';
import type { Electronics } from '../../types/Types';
import { savedItems } from '../../redux/features/saved';

const Wishlist = () => {
  const dispatch = useDispatch();
  const [daata, setDaata] = useState<Electronics[]>([]);
  const savedDSata = useSelector((state: RootState) => state.save.value);

  useEffect(() => {
    const exist = localStorage.getItem("saved");
    const parsed: Electronics[] = exist ? JSON.parse(exist) : [];
    setDaata(parsed);
  }, []);

  useEffect(() => {
    if (savedDSata.length > 0) {
      const exist = localStorage.getItem("saved");
      const isExist: Electronics[] = exist ? JSON.parse(exist) : [];

      let updated = [...isExist];

      savedDSata.forEach(newItem => {
        const isAlreadySaved = isExist.some(item => item.id === newItem.id);
        if (!isAlreadySaved) {
          updated.push(newItem);
        }
      });

      localStorage.setItem("saved", JSON.stringify(updated));
      setDaata(updated);
    }
  }, [savedDSata]);

  function handleRemove(item: Electronics) {
    dispatch(savedItems(item)); 
    const exist = localStorage.getItem("saved");
    const savedArr: Electronics[] = exist ? JSON.parse(exist) : [];
    const updated = savedArr.filter(i => i.id !== item.id);
    localStorage.setItem("saved", JSON.stringify(updated));
    setDaata(updated);
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f2f2f2', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#007bff', marginBottom: '2rem' }}>My Wishlist</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {daata?.map((item: Electronics, index: number) => (
          <div
            key={item.id ?? index}
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              marginBottom: '1.5rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.1)'
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#333' }}>{item.fname} {item.lname}</h2>
            <p style={{ margin: '0.25rem 0', color: '#555' }}><strong>Username:</strong> {item.username}</p>
            <p style={{ margin: '0.25rem 0', color: '#555' }}><strong>Age:</strong> {item.age}</p>
            <p style={{ margin: '0.25rem 0', color: '#555' }}><strong>Phone:</strong> {item.phoneNumber}</p>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: '1rem'
            }}>
              <button
                onClick={() => handleRemove(item)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Wishlist);
