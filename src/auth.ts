/*
    We control the button here for the username and token info
    We also access the user data here as well and set everything in Google Chrome's local storage
*/

document.getElementById("saveUsername")?.addEventListener("click", () => {
    const username = (document.getElementById("username") as HTMLInputElement).value
    const usernameDoc = document.getElementById("usernameStatus")

    if (username) {
        chrome.storage.local.set({ githubUsername: username }, () => {
            usernameDoc!.textContent = "Username saved successfully"
            usernameDoc!.style.color = "green"
        })
    } else {
        usernameDoc!.textContent = "Please enter your GitHub username"
        usernameDoc!.style.color = "red"
    }
})

document.getElementById("saveToken")?.addEventListener("click", () => {
    const token = (document.getElementById("token") as HTMLInputElement).value
    const tokenDoc = document.getElementById("tokenStatus")

    if (token) {
        chrome.storage.local.set({ githubToken: token }, () => {
            tokenDoc!.textContent = "Token saved successfully"
            tokenDoc!.style.color = "green"
        })
    } else {
        tokenDoc!.textContent = "Please enter your GitHub token"
        tokenDoc!.style.color = "red"
    }
})
