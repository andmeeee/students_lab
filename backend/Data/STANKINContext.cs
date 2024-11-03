using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stankin.Data.Entities;

namespace Stankin.Data;

public class STANKINContext:DbContext{
    public STANKINContext(DbContextOptions<STANKINContext> options):base(options)
    {

    }

    public DbSet<Student> Students {get; set;}
}