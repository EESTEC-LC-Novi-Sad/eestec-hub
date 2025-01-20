export default function Tag({children, className}) {
    return <div className={`border rounded-full px-3 py-1 text-xs ${className}`}>
            {children}
        </div>
}
