// -----------------------------------------------------------------------
// Services Container
// -----------------------------------------------------------------------

using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// -----------------------------------------------------------------------
// HTTP Request Pipeline
// -----------------------------------------------------------------------

var app = builder.Build();

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
