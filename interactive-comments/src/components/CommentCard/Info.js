const Info = ({ user, createdAt, isCurrUser }) => {

    return (
        <div className='info'>
            <img
                src={user.image.png}
                alt={`${ user.username }'s avatar`}
                />
            <p>{user.username}</p>
            {isCurrUser && <p className='OpieBtn'>you</p>}
            <p>{createdAt}</p>
        </div>
    );
};

export default Info;