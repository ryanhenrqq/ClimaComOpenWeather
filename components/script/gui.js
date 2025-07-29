document.addEventListener("DOMContentLoaded", function() {
    const guiId = localStorage.getItem("gui-state")
    if (!guiId) {
        localStorage.setItem("gui-state", "index")
    } else {
        console.log("tem algo gravado no gui!")
        if (guiId != "index") {
            setUserGui(guiId, "index")
        }
    }

    const keyApiSaver = document.getElementById("api-key-input-get")
    keyApiSaver.value = localStorage.getItem("user-api-key")
})

const apiKeyCallerBtn = document.getElementById("api-key-caller-btn")
apiKeyCallerBtn.addEventListener("click", function() {
    const background = document.getElementById("background-content")
    const apiKeyPopup = document.getElementById("api-key-pop")
    const callbackHome = document.getElementById("api-key-callback")

    apiKeyPopup.style.display = "flex"
    background.style.filter = "blur(5px)"
    background.style.pointerEvents = "none"

    callbackHome.addEventListener("click", function() {
        const keyApiSaver = document.getElementById("api-key-input-get")
        apiKeyPopup.style.display = "none"
        background.style.filter = "none"
        background.style.pointerEvents = "auto"

        if (keyApiSaver.value == "") {
            localStorage.setItem("user-api-key", keyApiSaver.value)
            console.error("Fatal: Não há uma chave API declarada. O mecânismo de busca não irá funcionar!")
            callGlobalError("Erro de chave API", "Não há uma chave API declarada. O mecânismo de busca não irá funcionar!")
        } else {
            console.log("Log: Definindo a chave API "+keyApiSaver.value+" no cache.")
            localStorage.setItem("user-api-key", keyApiSaver.value)
        }
    })
})

const cityEntryInput = document.getElementById("city-name-id")
cityEntryInput.addEventListener("keydown", (e) => {
    
    if (e.key === "Enter") {
        cityEntryInput.disabled = true
        fetchCoords(cityEntryInput)
    }
})

function callGlobalError(title, body) {
    const background = document.getElementById("background-content")
    const popup = document.getElementById("global-error-pop")
    const mktitle = document.getElementById("error-title")
    const mkbody = document.getElementById("error-body")
    const confirmBtn = document.getElementById("error-confirm")

    popup.style.display = "flex"
    background.style.filter = "blur(5px)"
    background.style.pointerEvents = "none"

    mktitle.textContent = title
    mkbody.textContent = body

    confirmBtn.addEventListener("click", function() {
        popup.style.display = "none"
        background.style.filter = "none"
        background.style.pointerEvents = "auto"
    })
}

function callGlobalInfo(title, body) {
    const background = document.getElementById("background-content")
    const popup = document.getElementById("global-info-pop")
    const mktitle = document.getElementById("info-title")
    const mkbody = document.getElementById("info-body")
    const confirmBtn = document.getElementById("info-confirm")

    popup.style.display = "flex"
    background.style.filter = "blur(5px)"
    background.style.pointerEvents = "none"

    mktitle.textContent = title
    mkbody.textContent = body

    confirmBtn.addEventListener("click", function() {
        popup.style.display = "none"
        background.style.filter = "none"
        background.style.pointerEvents = "auto"
    })
}

function setUserGui(state, target) {
    const index_head = document.getElementById("index-info-header")
    const all_head = document.getElementById("all-info-header")

    const index_main = document.getElementById("index-style-main")
    const content_main = document.getElementById("content-style-main")

    console.log("Log: Alterando variavel salvo em cache > De "+ state+" para "+target)
    localStorage.setItem("gui-state", target)

    if (target == "index") {
        cityEntryInput.disabled = false
        all_head.style.display = "none"
        content_main.style.display = "none"
        index_head.style.display = "flex"
        index_main.style.display = "flex"
        input.disabled = false
    } else {
        all_head.style.display = "flex"
        content_main.style.display = "flex"
        index_head.style.display = "none"
        index_main.style.display = "none"
    }
}