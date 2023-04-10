const Button = ({ className, alt, children, onClick }) => {
	return (
		<button
			className={className}
			onClick={onClick}
			alt={alt}
		>
			{children}
		</button>
	);
};

export default Button;
