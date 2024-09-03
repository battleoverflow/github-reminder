# GitHub Reminder

A browser extension that reminds you to make a GitHub commit every day.

The extension does an hourly check for a GitHub token and if a commit has been made to GitHub within that time frame. The extension uses the system's notification infrastructure to notify the user when a commit has not been made during that timeframe. While the extension checks every hour, you will only recieve a notification if a commit has not been made yet. If a commit has been made, then no notification will be sent.
