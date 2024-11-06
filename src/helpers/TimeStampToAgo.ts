const TimeStampToAgo = (time: string) => {
    let toDisplay: string = "";

    let postedOn = new Date(time);
    let currentDate = new Date();
    let timeDifference = currentDate.getTime() - postedOn.getTime(); // Difference in milliseconds

    // Converting time difference into days, hours, minutes, and seconds
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days > 0) {
       toDisplay = days + "d";
    } else if (hours > 0) {
       toDisplay = hours + "hr";
    } else if (minutes > 0) {
       toDisplay = minutes + "min";
    } else {
       toDisplay = seconds + "sec";
    }
    
    return toDisplay;
 };

 export default TimeStampToAgo;