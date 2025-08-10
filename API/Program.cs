
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
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.Interfaces;
using Infrastructure.Security;
using Infrastructure.Photos;
using API.SignalR;


namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // var MyAllowSpecificOrigins = "MyAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
          
            builder.Services.AddControllers(options=>
            {                    
                var policy = new AuthorizationPolicyBuilder() // tool to set what kind of policy for authentication 
                                .RequireAuthenticatedUser()// allow only for logged in user.
                                .Build(); 
                options.Filters.Add(new AuthorizeFilter(policy));// the filter applied to entire controller that says Login is required.
            });

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultDbConnection"));
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy( "MyAllowSpecificOrigins",
                                  policy =>
                                  { policy.AllowCredentials().WithOrigins("https://localhost:3001").AllowAnyHeader().AllowAnyMethod();
                                  });
            });
            builder.Services.AddMediatR(x =>
            {
                x.RegisterServicesFromAssemblyContaining<GetActivityList.QueryHandler>();
                x.AddOpenBehavior(typeof(ValidationBehavior<,>)); // ,
                                                                  //  "typeof 안에 그냥 ValidationBehavior라고 이름만 넣으면 안 된다"는 뜻이고,"반드시 ValidationBehavior<,>처럼 열려 있는 제네릭 타입 형태로 써야 한다"는 뜻입니다.

            });
            builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
            builder.Services.AddScoped<IUserAccessor,UserAccessor>();
            builder.Services.AddScoped<IPhotoService, PhotoService>();
            builder.Services.AddSignalR();
            builder.Services.AddAutoMapper(typeof(AutoMapping).Assembly);
            builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
            builder.Services.AddTransient<ExceptionMiddleware>();
            builder.Services.AddIdentityApiEndpoints<User>(options => options.User.RequireUniqueEmail = true).AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
            
            // 권한관련
            builder.Services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

			var app = builder.Build();

            // Configure the HTTP request pipeline. middleware

            app.UseMiddleware<ExceptionMiddleware>();
            



            app.UseRouting();
            // app.UseCors(x => x.AllowAnyHeader()
            //                 .AllowAnyMethod()
            //                 .AllowCredentials()
            //                 .WithOrigins("https://localhost:3001"));
            app.UseCors("MyAllowSpecificOrigins");

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.MapGroup("/api").MapIdentityApi<User>();// url 경로가 /api로 시작하는 요청들을 하나의 그룹으로 묶는것
            app.MapHub<CommentHub>("/comments");
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<AppDbContext>();
                var userManager = services.GetRequiredService<UserManager<User>>();
                await context.Database.MigrateAsync();
                await DbInitializer.SeedData(context,userManager);
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
