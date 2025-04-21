using System.Collections.Concurrent;
using EchoChat.Entities;

namespace EchoChat.Services;

public class DataService
{
    private readonly ConcurrentDictionary<string, Connection> _connections = new();
    public ConcurrentDictionary<string, Connection> Connections => _connections;
}