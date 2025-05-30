// -----------------------------------------------------------------------
// Services Container
// -----------------------------------------------------------------------

using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddCors();
builder.Services.AddMediatR(
    m => m.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>()
);

// -----------------------------------------------------------------------
// HTTP Request Pipeline
// -----------------------------------------------------------------------

var app = builder.Build();

app.UseCors(options => {
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithOrigins("http://localhost:3000", "https://localhost:3000");
});

app.MapControllers();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();

    await context.Database.MigrateAsync();

    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    
    logger.LogError(ex, "An error occurred while migrating the database.");
}

app.Run();
