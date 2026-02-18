export default function LoadingSpinner() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--accent)] animate-spin"></div>
                </div>
                <span className="text-sm text-muted animate-pulse">Loading...</span>
            </div>
        </div>
    );
}
