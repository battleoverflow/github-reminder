
const CHECK_INTERVAL = 3600 * 1000 // 3600 seconds

// Access the GitHub username stored in Google Chrome local storage
async function getGitHubUsername(): Promise<string | null> {
    return new Promise((resolve) => {
        chrome.storage.local.get("githubUsername", (result) => {
            resolve(result.githubUsername || null)
        })
    })
}

// Access the GitHub token stored in Google Chrome local storage
async function getGitHubToken(): Promise<string | null> {
    return new Promise((resolve) => {
        chrome.storage.local.get("githubToken", (result) => {
            resolve(result.githubToken || null)
        })
    })
}

async function fetchRepositories(username: string, token: string): Promise<any[]> {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json"
        }
    })

    if (!response.ok) {
        console.error("Failed to fetch repositories:", response.statusText)
        return []
    }

    return await response.json()
}

async function checkCommitsInRepo(repo: any, token: string): Promise<boolean> {
    const today = new Date().toISOString().split("T")[0]
    const sinceDate = new Date(today)
    sinceDate.setHours(0, 0, 0, 0)
    const untilDate = new Date(today)
    untilDate.setHours(23, 59, 59, 999)

    const response = await fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${sinceDate.toISOString()}&until=${untilDate.toISOString()}`,
        {
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json"
            }
        }
    )

    if (!response.ok) {
        console.error("Failed to fetch commits:", response.statusText)
        return false
    }

    const commits = await response.json()
    return commits.length > 0
}

async function validGitHubData(): Promise<boolean> {
    const githubUsername = await getGitHubUsername()
    const githubToken = await getGitHubToken()

    if (githubUsername && githubToken) {
        return true
    }

    return false
}

const notifyMissingUsername = () => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Missing Username",
        message: "No GitHub username set",
        priority: 2
    })
}

const notifyMissingToken = () => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Missing GitHub Token",
        message: "No GitHub token set",
        priority: 2
    })
}

async function checkForCommitsToday(): Promise<boolean> {
    const githubUsername = await getGitHubUsername()
    const githubToken = await getGitHubToken()

    if (!githubUsername) {
        console.error("GitHub username not found")
        notifyMissingUsername()
        return false
    }

    if (!githubToken) {
        console.error("GitHub token not found")
        notifyMissingToken()
        return false
    }

    const repos = await fetchRepositories(githubUsername, githubToken)

    for (const repo of repos) {
        if (await checkCommitsInRepo(repo, githubToken)) {
            return true
        }
    }

    return false
}

chrome.alarms.create("checkCommits", {
    // Convert milliseconds to minutes
    periodInMinutes: CHECK_INTERVAL / (60 * 1000)
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "checkCommits") {
        const hasCommits = await checkForCommitsToday()
        const isValidGitHubData = await validGitHubData()

        if (isValidGitHubData) {
            if (hasCommits) {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "GitHub Commit Reminder",
                    message: "GitHub commit detected! Awesome job!! :D",
                    priority: 2
                })
            }
    
            if (!hasCommits) {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "GitHub Commit Reminder",
                    message: "No GitHub commits detected! Make sure to commit! :)",
                    priority: 2
                })
            }
        }
    }
})
