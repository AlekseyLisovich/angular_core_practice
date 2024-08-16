using angular_core_practice.Server.Repositories.Interfaces;
using angular_core_practice.Server.Repositories;
using angular_core_practice.Server.Services;
using angular_core_practice.Server.Services.Interfaces;
using angular_core_practice.Server.EF;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder.WithOrigins("https://localhost:4200")
                             .AllowAnyMethod()
                             .AllowAnyHeader());

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//app.MapFallbackToFile("/index.html");

app.Run();