import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import StudentList from './StudentList';
import AddStudentForm from './AddStudentForm';
import FilterStudentsForm from './FilterStudentsForm';

function App() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    // Функция для загрузки студентов
    const fetchStudents = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5159/api/student');
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setStudents(data);
            setFilteredStudents(data);
        } catch (error) {
            console.error('Ошибка при загрузке студентов:', error);
        }
    }, []); // Зависимости пустые, так как эта функция не зависит от других переменных

    useEffect(() => {
        fetchStudents();
        console.log(students); // Пример использования students
    }, [fetchStudents, students]); 

    

    // Функция для фильтрации студентов
    const handleFilter = async (filterParams) => {
        try {
            const query = new URLSearchParams({
                fromDate: filterParams.fromDate ? filterParams.fromDate.toISOString() : '',
                toDate: filterParams.toDate ? filterParams.toDate.toISOString() : '',
                minAge: filterParams.minAge !== null ? filterParams.minAge : 0,
                maxAge: filterParams.maxAge !== null ? filterParams.maxAge : 100,
            }).toString();

            const response = await fetch(`http://localhost:5159/api/Student/FilterStudents?${query}`);
            if (!response.ok) throw new Error(await response.text());

            const data = await response.json();
            setFilteredStudents(data);
        } catch (error) {
            console.error('Ошибка при фильтрации:', error);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:5159/api/student/deletestudent/${studentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(await response.text());

            // Перезагружаем студентов после удаления
            fetchStudents();
        } catch (error) {
            console.error('Ошибка при удалении студента:', error);
        }
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Основы новых информационных технологий. Лабораторная 1</h1>
                <p>Выполнил: Тайчер А.Б. ИДБ-21-01</p>
            </div>

            <div className="content">
                <div className="full-list">
                    <StudentList students={filteredStudents} onDelete={handleDeleteStudent} />
                    <div className="bottom">
                        <AddStudentForm fetchStudents={fetchStudents} />
                        <FilterStudentsForm onFilter={handleFilter} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
