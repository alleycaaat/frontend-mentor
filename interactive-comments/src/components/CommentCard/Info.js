import EditDeleteBtns from '../EditComment/EditDeleteBtns';
import ReplyBtn from '../ui/ReplyBtn';

const Info = ({ id, user, createdAt, isCurrUser, setIsReplying }) => {
    return (
        <div className='smallscreenInfo'>
            <img
                src={user.image.png}
                alt={`${ user.username }'s avatar`}
            />
            <p>{user.username}</p>
            {isCurrUser && <p className='OpieBtn'>you</p>}
            <p>{createdAt}</p>

            <div className='largescreenInfo'>
                {isCurrUser
                    ? <EditDeleteBtns
                        id={id}
                    />
                    : <ReplyBtn
                        setIsReplying={setIsReplying}
                        id={id}
                    />
                }
            </div>
        </div>
    );
};

export default Info;