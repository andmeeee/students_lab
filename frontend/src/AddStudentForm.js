import React, { useState } from 'react';
import './add.css';

const AddStudentForm = ({ fetchStudents }) => {
    const [studentData, setStudentData] = useState({
        fullName: '',
        studentN: '',
        birthDate: '',
        regDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5159/api/Student/AddStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении студента');
            }

            // Обновляем список студентов после успешного добавления
            fetchStudents();

            // Очищаем форму
            setStudentData({
                fullName: '',
                studentN: '',
                birthDate: '',
                regDate: ''
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <form div className='form' onSubmit={handleSubmit}>
            <h4>Добавить студента</h4>
            <div className='string'>
                <label>ФИО</label>
                <input
                    type="text"
                    name="fullName"
                    placeholder="ФИО"
                    value={studentData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='string'>
                <label>Номер зачетной книжки</label>
                <input
                    type="text"
                    name="studentN"
                    placeholder="Номер зачетной книжки"
                    value={studentData.studentN}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='string'>
                <label>Дата рождения</label>
                <input
                    type="date"
                    name="birthDate"
                    value={studentData.birthDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='string'>
                <label>Дата поступления</label>
                <input
                    type="date"
                    name="regDate"
                    value={studentData.regDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Добавить студента</button>
        </form>
    );
};

export default AddStudentForm;