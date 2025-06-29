
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading.Tasks;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultDbConnection"));
            });



         
            var app = builder.Build();

			// Configure the HTTP request pipeline. middleware

			app.UseRouting();


			app.MapControllers();

            using var scope =app.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context =services.GetRequiredService<AppDbContext>();
                await context.Database.MigrateAsync();
                await DbInitializer.SeeData(context);
            }
            catch (Exception ex) {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex,"Error Occurs");
            }

            app.Run();
        }
    }
}
