import React, { useEffect, useState } from 'react';
import type { Electronics } from '../../types/Types';
import { useDispatch, useSelector } from 'react-redux';
import { deletedItems } from '../../redux/features/delete';
import { savedItems, removeSavedItem } from '../../redux/features/saved';
import { FaBookmark } from "react-icons/fa";
import type { RootState } from '../../redux';

const Home = () => {
  const dispatch = useDispatch();
  const savedDSata = useSelector((state: RootState) => state.save.value);
  const [data, setData] = useState<Electronics[]>([]);

  useEffect(() => {
    const dataString = localStorage.getItem('created');
    const storedData: Electronics[] = dataString ? JSON.parse(dataString) : [];
    setData(storedData);
  }, []);

  function handleSave(item: Electronics) {
    dispatch(savedItems(item));  
    const exist = localStorage.getItem("saved");
    let savedArr: Electronics[] = exist ? JSON.parse(exist) : [];

    const isSaved = savedArr.some(i => i.id === item.id);
    if (isSaved) {
      savedArr = savedArr.filter(i => i.id !== item.id);
    } else {
      savedArr.push(item);
    }
    localStorage.setItem("saved", JSON.stringify(savedArr));
  }

  function handleDelete(id: number | string): void {
    let isConfirm = window.confirm("Do you want delete?");
    if (isConfirm) {
      const itemToDelete = data.find(i => i.id === id);
      if (itemToDelete) {
        dispatch(deletedItems(itemToDelete));
        dispatch(removeSavedItem(id)); 
        const newData = data.filter(item => item.id !== id);
        setData(newData);
        localStorage.setItem('created', JSON.stringify(newData));

        const exist = localStorage.getItem("saved");
        const savedArr: Electronics[] = exist ? JSON.parse(exist) : [];
        const updatedSaved = savedArr.filter(i => i.id !== id);
        localStorage.setItem("saved", JSON.stringify(updatedSaved));
      }
    }
  }

  function isSaved(id: number | string): boolean {
    return savedDSata.some(i => i.id === id);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      {data?.map((item, index) => (
        <div
          key={item.id ?? index}
          style={{
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.3s ease',
          }}
        >
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#1a202c' }}>{item.fname}</h1>
          <h2 style={{ margin: '0 0 0.3rem 0', fontSize: '1.2rem', color: '#2d3748' }}>{item.lname}</h2>
          <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem', color: '#4a5568' }}>{item.username}</h3>
          <p style={{ margin: '0 0 0.2rem 0', color: '#718096' }}>Username: {item.username}</p>
          <p style={{ margin: 0, color: '#718096' }}>Age: {item.age}</p>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '1rem',
            gap: '1rem',
          }}>
            <button
              onClick={() => handleDelete(item.id ?? "")}
              style={{
                padding: '0.4rem 0.9rem',
                backgroundColor: '#e53e3e',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Delete
            </button>

            <FaBookmark 
              onClick={() => handleSave(item)}
              style={{ 
                cursor: 'pointer', 
                color: isSaved(item.id) ? 'orange' : '#a0aec0', 
                fontSize: '1.4rem', 
                transition: 'color 0.3s ease' 
              }} 
              title={isSaved(item.id) ? "Remove from saved" : "Save item"} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Home);
