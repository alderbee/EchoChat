import { memo } from 'react';

const MessageContainer = memo(({ messages }) => (
    <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-2">
        {messages.map((msg, index) => (
            <div key={`${msg.user}-${index}`} className="p-1">
                <strong>{msg.user}</strong> {msg.message}
            </div>
        ))}
    </div>
));

MessageContainer.displayName = 'MessageContainer';
export default MessageContainer;