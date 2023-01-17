using EnergyConsumptionBackendApp.API.Services.Interfaces;
using EnergyConsumptionBackendApp.API.Services;
using EnergyConsumptionBackendApp.Data;
using Microsoft.EntityFrameworkCore;
using EnergyConsumptionBackendApp.Data.Repositories.Interfaces;
using EnergyConsumptionBackendApp.Data.Repositories;
using EnergyConsumptionBackendApp.Core.Models;



var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<DataContext>(options =>
                options
                    .UseNpgsql(builder.Configuration.GetConnectionString("PostgresDb")
                    ));



builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDeviceService, DeviceService>();
builder.Services.AddScoped<IEnergyService, EnergyService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IRepository<User>, Repository<User>>();
builder.Services.AddScoped<IRepository<Device>, Repository<Device>>();
builder.Services.AddScoped<IRepository<Energy>, Repository<Energy>>();



var app = builder.Build();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());



// Configure the HTTP request pipeline.



app.UseRouting();
//Enable Authentication
app.UseAuthentication();
app.UseAuthorization(); //<< This needs to be between app.UseRouting(); and app.UseEndpoints();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;



   var context = services.GetRequiredService<DataContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}



app.Run();