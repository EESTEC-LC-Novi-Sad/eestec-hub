export default function Button({ children, className, onClick, type }) {
    return (
      <button type={type} onClick={onClick} className={
          `p-1 border border-solid border-gray-400 rounded 
           hover:bg-gray-200
           ${className}`
      }>
        {children} 
      </button>
    )
}
