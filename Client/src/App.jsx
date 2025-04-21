import { useState, useCallback } from 'react';
import Home from './Components/Home';
import ChatRoom from './Components/ChatRoom';
import { HubConnectionBuilder } from '@microsoft/signalr';

function App() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const joinChatRoom = useCallback(async (username, socialroom) => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5086/chatHub')
        .withAutomaticReconnect()
        .build();

      await newConnection.start();

      newConnection.on('ReceiveMessage', (user, message) => {
        setMessages(prev => [...prev, { user, message }]);
      });

      await newConnection.invoke('JoinSocialRoom', { userName: username, socialRoom: socialroom });
      setConnection(newConnection);
    } catch (error) {
      console.error('Error joining chat room:', error);
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (!messageText.trim()) return;

    try {
      await connection?.invoke('SendMessage', messageText);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [connection, messageText]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">Welcome to the Echo Chat Client</h1>
      {!connection ? (
        <Home joinChatRoom={joinChatRoom} />
      ) : (
        <ChatRoom
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default App;