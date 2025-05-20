import { formatDate, formatTime } from './time';

export const timePassed = (createdAt: Date | string) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(createdAt).getTime();
  const minutes = Math.floor(timeDifference / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return 'Now';
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (days === 1) {
    return 'Yesterday ' + formatTime(createdAt);
  }
  return formatDate(createdAt);
};
