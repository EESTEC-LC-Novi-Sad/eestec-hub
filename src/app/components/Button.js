export default function Button({ children, className, onClick }) {
    return (
      <button onClick={onClick} className={
          `p-1 border border-solid border-gray-400 rounded 
           hover:bg-gray-200
           hover:text-gray-700
           ${className}`
      }>
        {children} 
      </button>
    )
}
