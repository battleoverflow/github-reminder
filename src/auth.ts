/*
    We control the button here for the username and token info
    We also access the user data here as well and set everything in Google Chrome's local storage
*/

document.getElementById("saveUsername")?.addEventListener("click", () => {
    const username = (document.getElementById("username") as HTMLInputElement).value

    if (username) {
        chrome.storage.local.set({ githubUsername: username }, () => {
            document.getElementById("usernameStatus")!.textContent = "Username saved successfully"
            document.getElementById("usernameStatus")!.style.color = "green"
        })
    } else {
        document.getElementById("usernameStatus")!.textContent = "Please enter your GitHub username"
        document.getElementById("usernameStatus")!.style.color = "red"
    }
})

document.getElementById("saveToken")?.addEventListener("click", () => {
    const token = (document.getElementById("token") as HTMLInputElement).value

    if (token) {
        chrome.storage.local.set({ githubToken: token }, () => {
            document.getElementById("tokenStatus")!.textContent = "Token saved successfully"
            document.getElementById("tokenStatus")!.style.color = "green"
        })
    } else {
        document.getElementById("tokenStatus")!.textContent = "Please enter your GitHub token"
        document.getElementById("tokenStatus")!.style.color = "red"
    }
})
