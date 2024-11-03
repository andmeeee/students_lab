using Microsoft.EntityFrameworkCore;
using Stankin.Data;

var builder = WebApplication.CreateBuilder(args);

// Добавление службы CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Регистрация контроллеров
builder.Services.AddControllers();

builder.Services.AddDbContext<STANKINContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReactConnection"));
});

var app = builder.Build();

app.UseCors("AllowAllOrigins");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Включаем CORS

// Включаем маршрутизацию для контроллеров
app.MapControllers();

app.Run();
