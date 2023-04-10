const ReplyTxt = ({ replyingTo, content }) => {
	return (
		<div className='replyTxt'>
			<p><span className='replyingTo'>@{replyingTo}</span>{content}</p>
		</div>
	);
};

export default ReplyTxt;