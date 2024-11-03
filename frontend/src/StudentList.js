import React from 'react';

const StudentList = ({ students, onDelete }) => {
    if (!students.length) {
        return <p>Студенты не найдены.</p>;
    }

    return (
        <div className='table-container'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Номер билета</th>
                    <th>Дата рождения</th>
                    
                    <th>Дата поступления</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.fullName}</td>
                            <td>{student.studentN}</td>
                            <td>{new Date(student.birthDate).toLocaleDateString()}</td>
                            <td>{new Date(student.regDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => onDelete(student.id)}>Х</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

    );
};

export default StudentList;
