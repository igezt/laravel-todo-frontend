import moment from 'moment-timezone';

// Set the time zone to Singapore
export const singaporeTime = moment.tz.setDefault('Asia/Singapore');

export const getCurrentSingaporeTime = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};
