using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Stankin.Data.Entities; // Предполагаем, что в этой папке модель Student
using Stankin.Data;
using Microsoft.EntityFrameworkCore; // Где находится ваш контекст данных

namespace Stankin.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly STANKINContext _context;

        public StudentController(STANKINContext context)
        {
            _context = context;
        }

        // GET: api/student
        [HttpGet]
        public ActionResult<IEnumerable<Student>> GetStudents()
        {
            var students = _context.Students.ToList();
            return Ok(students);
        }

        // GET: api/student/{id}
        [HttpGet("{id}")]
        public ActionResult<Student> GetStudent(int id)
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent([FromBody] Student newStudent)
        {
            if (newStudent == null)
            {
                return BadRequest("Invalid student data.");
            }

            try
            {
                _context.Students.Add(newStudent);
                await _context.SaveChangesAsync();
                return Ok(newStudent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound("Student not found.");
            }

            try
            {
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                return Ok("Student deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("FilterStudents")]
        public async Task<IActionResult> FilterStudents(
            DateTime? fromDate = null, 
            DateTime? toDate = null,
            int? minAge = null,
            int? maxAge = null)
        {
            try
            {
                var students = _context.Students.AsQueryable();

                // Фильтрация по дате поступления
                if (fromDate.HasValue)
                {
                    students = students.Where(s => s.RegDate >= fromDate.Value);
                }
                if (toDate.HasValue)
                {
                    students = students.Where(s => s.RegDate <= toDate.Value);
                }

                // Фильтрация по возрасту
                if (minAge.HasValue || maxAge.HasValue)
                {
                    DateTime currentDate = DateTime.Now;

                    if (minAge.HasValue)
                    {
                        students = students.Where(s => (currentDate.Year - s.BirthDate.Year) >= minAge.Value);
                    }
                    if (maxAge.HasValue)
                    {
                        students = students.Where(s => (currentDate.Year - s.BirthDate.Year) <= maxAge.Value);
                    }
                }

                var result = await students.ToListAsync();

                if (!result.Any())
                {
                    return NotFound("No students found for the specified criteria.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    }
