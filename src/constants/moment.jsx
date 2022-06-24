import moment from 'moment';

export const formatTime = (array) => {
    return moment(array).fromNow(true);
};

export const formatDate = (array) => {
    const now = moment(moment().toArray());
    const time = moment(array);
    if (now.diff(time, 'years')) {
        return moment(array).format('DD/MM/YY, k:mm');
    } else if (now.diff(time, 'months') || now.diff(time, 'weeks')) {
        return moment(array).format('MMM DD YYYY, k:mm');
    } else if (now.diff(time, 'days')) {
        return moment(array).format('ddd k:mm');
    } else {
        return moment(array).format('k:mm');
    }
};
