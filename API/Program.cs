
using Application.Activities.Queries;
using Application.Core;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;
using Persistence;
using System.Reflection;
using System.Threading.Tasks;
using Application.Activities.Validator;
using API.Middleware;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultDbConnection"));
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("https://localhost:3001").AllowAnyHeader().AllowAnyMethod(); 
                                  });
            });
            builder.Services.AddMediatR(x =>
            {
                x.RegisterServicesFromAssemblyContaining<GetActivityList.QueryHandler>();
                x.AddOpenBehavior(typeof(ValidationBehavior<,>)); // typeof에서는 type의 이름을 넣을 수 없다.
                
            });

            builder.Services.AddAutoMapper(typeof(AutoMapping).Assembly);
            builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
            builder.Services.AddTransient<ExceptionMiddleware>();
            

          



			var app = builder.Build();

            // Configure the HTTP request pipeline. middleware

            app.UseMiddleware<ExceptionMiddleware>();



            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthorization();
            app.MapControllers();
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<AppDbContext>();
                await context.Database.MigrateAsync();
                await DbInitializer.SeeData(context);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error Occurs");
            }

            app.Run();
        }
    }
}
