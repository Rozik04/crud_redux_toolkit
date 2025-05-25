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
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      {daata?.map((item: Electronics, index: number) => (
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
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(Wishlist);
