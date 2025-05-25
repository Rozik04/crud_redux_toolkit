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
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      {data?.map((item, index) => (
        <div
          key={item.id ?? index}
          style={{
            backgroundColor: '#fff',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#333' }}>{item.name}</h1>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#555' }}>${item.price}</h2>
          <p style={{ margin: 0, color: '#666' }}>{item.description}</p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '20px',
          }}>
            <button onClick={() => handleDelete(item.id ?? "")}>Delete</button>

            <FaBookmark 
              onClick={() => handleSave(item)} 
              style={{ cursor: 'pointer', color: isSaved(item.id) ? 'orange' : 'gray' }} 
              title={isSaved(item.id) ? "Remove from saved" : "Save item"} 
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(Home);
