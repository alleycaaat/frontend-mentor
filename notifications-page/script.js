const markAll = document.querySelector('.mark-all');
const unreadMsgs = document.querySelectorAll('.unread');
let messages = document.querySelectorAll('article'),
    notificationCount = document.querySelector('.notes');

let noteCount = parseInt(notificationCount.textContent);

const markRead = (e) => {
    let msg = e.target.closest('article');

    noteCount--;
    msg.querySelector('.notification-dot').remove();
    msg.classList.remove('unread');
    msg.removeEventListener('click', markRead);

    notificationCount.textContent = noteCount;
};

unreadMsgs.forEach(msg => {
    msg.addEventListener('click', markRead);
});

const remove = () => {
    unreadMsgs.forEach(msg => {
        msg.removeEventListener('click', markRead);
    });
};

const markAllRead = () => {
    //need to initilize unreadMsgs again to get accurate list
    //in case original number isn't accurate anymore
    let unreadMsgs = document.querySelectorAll('.unread');

    if (unreadMsgs === []) { return; }
    unreadMsgs.forEach(msg => {
        msg.querySelector('.notification-dot').remove();
        msg.classList.remove('unread');
    });
    notificationCount.textContent = 0;
    remove();
};

markAll.onclick = markAllRead;