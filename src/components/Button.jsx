import './Button.css'

function Button({ children, variant = 'primary', className = '', ...props }) {
  const combinedClass = [`btn`, `btn-${variant}`, className].filter(Boolean).join(' ')

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  )
}

export default Button

