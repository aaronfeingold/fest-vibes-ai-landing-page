export const ChatInput = () => (
  <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Type a message..."
        disabled
        className="flex-1 bg-gray-700/50 text-gray-500 rounded-full px-4 py-2 text-sm cursor-not-allowed"
      />
      <button
        disabled
        className="bg-brand-primary/30 text-white rounded-full p-2 cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  </div>
);
