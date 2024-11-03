import React, { useState } from 'react';
import './List.css';

const FilterStudentsForm = ({ onFilter }) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [minAge, setMinAge] = useState(null);
    const [maxAge, setMaxAge] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ fromDate, toDate, minAge, maxAge });
    };

    const handleReset = () => {
        
        // Вызываем фильтр с пустыми параметрами для сброса
        onFilter({
            fromDate: null,
            toDate: null,
            minAge: null,
            maxAge: null,
        });
    };

    return (
        <form className="filter-form" onSubmit={handleSubmit}>
            <h4>Фильтр студентов</h4>
            <div className="filter-string">
                <label htmlFor="fromDate">Дата с:</label>
                <input
                    type="date"
                    id="fromDate"
                    onChange={(e) => setFromDate(e.target.value ? new Date(e.target.value) : null)}
                />
            </div>
            <div className="filter-string">
                <label htmlFor="toDate">Дата по:</label>
                <input
                    type="date"
                    id="toDate"
                    onChange={(e) => setToDate(e.target.value ? new Date(e.target.value) : null)}
                />
            </div>
            <div className="filter-string">
                <label htmlFor="minAge">Минимальный возраст:</label>
                <input
                    type="number"
                    id="minAge"
                    onChange={(e) => setMinAge(e.target.value ? parseInt(e.target.value) : null)}
                />
            </div>
            <div className="filter-string">
                <label htmlFor="maxAge">Максимальный возраст:</label>
                <input
                    type="number"
                    id="maxAge"
                    onChange={(e) => setMaxAge(e.target.value ? parseInt(e.target.value) : null)}
                />
            </div>
            <div className='bit'>
                <button  className='filll' type="submit">Применить фильтр</button>
                
                <button className='reset' type="button" onClick={handleReset} style={{ marginLeft: '10px' }}>Х</button>
            </div>
        </form>
    );
};

export default FilterStudentsForm;
