// Utility functions to format date and time for posts

module.exports = {
    // Returns a string representing the local time of the given date
    formatTime: (date) => {
      return date.toLocaleTimeString(); // Convert date to a readable time string
    },
    
    // Returns a string representing the formatted date
    formatDate: (date) => {
      const d = new Date(date);
      // Format date as MM/DD/YYYY with 5 years added to the year
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear() + 5}`;
    },
  };


