export const NameInput = () => {
    return (
        <label className="block">
            <span className="text-xs text-slate-500">Your Name</span>
            <div className="mt-2 relative">
                <input
                    type="text"
                    placeholder="Jonas Khanwald"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    required
                />
                {/* <User className="absolute right-3 top-3 h-5 w-5 text-slate-400" /> */}
            </div>
        </label>
    )
}