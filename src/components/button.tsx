export default function Button() {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Download</span>
        </button>
    )
}