document.addEventListener("DOMContentLoaded", function() {
    const guiId = localStorage.getItem("gui-state")
    if (!guiId) {
        localStorage.setItem("gui-state", "index")
    } else {
        console.log("tem algo gravado no gui!")
        if (guiId != "index") {
            setUserGui(guiId, "all")
        }
    }


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
            console.error("Fatal: Não há uma chave API declarada. O mecânismo de busca não irá funcionar!")
            callGlobalError("Erro de chave API", "Não há uma chave API declarada. O mecânismo de busca não irá funcionar!")
        }
    })
})

const cityEntryInput = document.getElementById("city-name-id")
cityEntryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        callGlobalError("Erro", "o script ainda nao ta pronto poh, espera uns dias ai pq é complexo o bagui")
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

function setUserGui(state, target) {
    const index_head = document.getElementById("index-info-header")
    const all_head = document.getElementById("all-info-header")

    console.log("Log: Alterando variavel salvo em cache > De "+ state+" para "+target)
    localStorage.setItem("gui-state", target)

    if (target == "index") {
        all_head.style.display = "none"
        index_head.style.display = "flex"
    } else {
        all_head.style.display = "flex"
        index_head.style.display = "none"
    }
}