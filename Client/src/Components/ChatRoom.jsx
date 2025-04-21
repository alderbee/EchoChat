import { memo } from 'react';
import MessageContainer from './MessageContainer';

const ChatRoom = memo(({ messages, messageText, setMessageText, sendMessage }) => (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Chat Room</h2>
        <MessageContainer messages={messages} />
        <div className="flex gap-2 mt-4">
            <input
                type="text"
                className="flex-1 border border-gray-300 rounded p-2"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                onClick={sendMessage}
                disabled={!messageText.trim()}
            >
                Send
            </button>
        </div>
    </div>
));

ChatRoom.displayName = 'ChatRoom';
export default ChatRoom;