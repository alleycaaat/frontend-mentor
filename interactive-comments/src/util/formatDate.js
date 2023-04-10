import moment from 'moment';

const formatDate = (createdAt) => {
    var postingTime = moment(createdAt);
    var currentTime = moment();
    const date = postingTime.from(currentTime);
    return date;
}

export default formatDate