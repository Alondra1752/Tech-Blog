// Module to format date and time for posts
module.exports = {
    // Function to format the time of a given date
    getFormattedTime: (date) => {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },
  
    // Function to format the date of a given date
    getFormattedDate: (date) => {
      const d = new Date(date);
      const month = d.getMonth() + 1; // Months are zero-based
      const day = d.getDate();
      const year = d.getFullYear() + 5; // Adding 5 years to the year
      
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    },
  };
  
