# GitHub Reminder

A browser extension that reminds you to make a GitHub commit every day.

> [!IMPORTANT]
> The new commit check interval is around every 12 hours, so you should only receive around 2 notifications per day, max. If you've already made a commit for the day, you'll still get a notification with a more positive response.

The extension does a daily check if a commit has been made to GitHub. The extension uses the system's notifications to notify the user when a commit has not been made during that time frame. You will also receive some positive reinforcement when a commit has been made.

## Usage

First, generate a GitHub personal access token (PAT) for your account. This can be done multiple ways, but for now, I'll stick with the web interface. Go to the following link in your browser: https://github.com/settings/tokens. Make sure you're logged into GitHub or this page will redirect. Once you've generated a new classic token with "repo" scoped permissions, simply install the extension through the Google Chrome Extension Store.

Now just paste your personal access token and username into the extension's input and save them. You will now start receiving notifications for as long as the extension is active!

> [!NOTE]
> This also depends on how long you set for your access token to be active. You can update the token and username within the extension as any time. The input boxes are active for as long as the extension is installed.
