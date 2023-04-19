export const dateUtil = {
  toHmsString: (seconds: number): string => {
    var hours = Math.floor(seconds / 60 / 60);
    var minutes = Math.floor(seconds / 60) - hours * 60;
    var s = seconds % 60;
    if (hours && minutes && s) {
      return `${hours}h ${minutes}m ${s}s`;
    } else if (hours && minutes) {
      return `${hours}h ${minutes}m`;
    } else if (minutes && s) {
      return `${minutes}m ${s}s`;
    } else if (hours && s) {
      return `${hours}h ${0}m ${s}s`;
    }

    return `${0}h ${0}m ${0}s`;
  },

  toHmString: (seconds: number): string => {
    var hours = Math.floor(seconds / 60 / 60);
    var minutes = Math.floor(seconds / 60) - hours * 60;

    if (hours && minutes) {
      return `${hours}h ${minutes}m`;
    } else if (hours) {
      return `${hours}h`;
    }

    return `${0}h ${minutes}m`;
  },

  getUnix(): number {
    return Math.round(+new Date() / 1000);
  },

  getUtcDate(date: Date) {
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    return new Date(now_utc);
  },
};
