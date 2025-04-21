import { useState } from 'react';

const Home = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [socialroom, setSocialRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim() || !socialroom.trim()) {
            return;
        }
        joinChatRoom(username.trim(), socialroom.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>

            <div>
                <label htmlFor="socialroom" className="block text-sm font-medium text-gray-700 mb-1">
                    Social Room <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="socialroom"
                    name="socialroom"
                    placeholder="Enter your social room"
                    value={socialroom}
                    onChange={(e) => setSocialRoom(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                disabled={!username.trim() || !socialroom.trim()}
            >
                Join
            </button>
        </form>
    );
};

export default Home;