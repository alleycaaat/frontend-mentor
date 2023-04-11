const Button = ({ className, alt, children, onClick }) => {
	return (
		<button
			className={className}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
