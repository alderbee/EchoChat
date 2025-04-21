using EchoChat.Entities;
using EchoChat.Services;
using Microsoft.AspNetCore.SignalR;

namespace EchoChat.Hub;

public class ConnectionHub : Microsoft.AspNetCore.SignalR.Hub
{
    private readonly DataService _service;

    public ConnectionHub(DataService service)
    {
        _service = service;
    }
    
    public async Task JoinSocialRoom(Connection hubCaller)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, hubCaller.SocialRoom);
      
        if (_service.Connections.TryAdd(Context.ConnectionId, hubCaller))
        {
            await Clients.Group(hubCaller.SocialRoom)
                .SendAsync("ReceiveMessage", $"{hubCaller.UserName} joined {hubCaller.SocialRoom}");
        }
    }

    public async Task SendMessage(string message)
    {
        if (_service.Connections.TryGetValue(Context.ConnectionId, out var connection))
        {
            await Clients.Group(connection.SocialRoom)
                .SendAsync("ReceiveMessage", connection.UserName, message);
        }
    }
}