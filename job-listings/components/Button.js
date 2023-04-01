const Button = ({ onClick, desc }) => {
  return <button className='item' onClick={onClick}>{desc}</button>;
};

export default Button;