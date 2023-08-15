// Event listener for when the document has loaded completely
document.addEventListener("DOMContentLoaded", function () {
  // Flag to keep track of the current time format (12-hour or 24-hour)
  let isIn24HourFormat = false;

  // References to the HTML elements that display the date and time
  const currentDateElement = document.getElementById("date");
  const currentDayElement = document.getElementById("day");
  const currentHoursElement = document.getElementById("hours");
  const currentMinutesElement = document.getElementById("minutes");
  const currentSecondsElement = document.getElementById("seconds");
  const amPmIndicatorElement = document.getElementById("session");
  const timeFormatToggleButton = document.getElementById("toggle-btn");

  /**
   * Function to update the displayed date and time.
   * Depending on the `isIn24HourFormat` flag, it will display time in 12-hour or 24-hour format.
   */
  function updateDateTimeDisplay() {
    const now = new Date();

    currentDateElement.textContent = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    currentDayElement.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // If the time is set to display in 24-hour format
    if (isIn24HourFormat) {
      currentHoursElement.textContent = now
        .getHours()
        .toString()
        .padStart(2, "0");
      amPmIndicatorElement.textContent = ""; // Clear AM/PM indicator
    } else {
      const twelveHourFormat = now.getHours() % 12 || 12;
      currentHoursElement.textContent = twelveHourFormat
        .toString()
        .padStart(2, "0");

      if (now.getHours() < 12) {
        amPmIndicatorElement.textContent = "AM";
      } else {
        amPmIndicatorElement.textContent = "PM";
      }
    }

    currentMinutesElement.textContent = now
      .getMinutes()
      .toString()
      .padStart(2, "0");
    currentSecondsElement.textContent = now
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }

  /**
   * Function to toggle between 12-hour and 24-hour time formats.
   */
  function toggleTimeFormat() {
    isIn24HourFormat = !isIn24HourFormat;

    if (isIn24HourFormat) {
      timeFormatToggleButton.textContent = "12-hr";
    } else {
      timeFormatToggleButton.textContent = "24-hr";
    }

    updateDateTimeDisplay();
  }

  // Attach the toggle function to the button's click event
  timeFormatToggleButton.addEventListener("click", toggleTimeFormat);

  // Initially display the current date and time
  updateDateTimeDisplay();

  // Set up an interval to update the time display every second
  setInterval(updateDateTimeDisplay, 1000);
});
