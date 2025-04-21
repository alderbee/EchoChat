using EchoChat.Hub;
using EchoChat.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") 
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddSingleton<DataService>();
var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowReactApp");

app.MapHub<ConnectionHub>("/chatHub");
app.Run();