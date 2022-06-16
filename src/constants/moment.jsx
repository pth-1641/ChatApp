import moment from 'moment';

export const formatTime = (array) => {
    return moment(array).fromNow(true);
};

export const formatDate = (array) => {
    const now = moment(moment().toArray());
    const time = moment(array);
    if (now.diff(time, 'years')) {
        return moment(array).format('DD/MM/YY, h:mm A');
    } else if (now.diff(time, 'months') || now.diff(time, 'weeks')) {
        return moment(array).format('MMM DD YYYY, h:mm A');
    } else if (now.diff(time, 'days')) {
        return moment(array).format('ddd h:mm A');
    } else {
        return moment(array).format('h:mm A');
    }
};

// export const formatDate = (array) => {
//     const now = moment(moment().toArray());
//     const time = moment(array);
//     if (now.diff(time, 'years')) {
//         return moment(array).format('DD/MM/YY, HH:mm A');
//     } else if (now.diff(time, 'months') || now.diff(time, 'weeks')) {
//         return moment(array).format('MMM DD YYYY, HH:mm A');
//     } else if (now.diff(time, 'days')) {
//         return moment(array).format('ddd HH:mm A');
//     } else {
//         return moment(array).format('HH:mm A');
//     }
// };
