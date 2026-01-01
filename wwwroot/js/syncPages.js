const totalPagesInput = document.querySelector('#total-pages')
const pagesReadInput = document.querySelector('#pages-read')
const finishedSwitch = document.querySelector('#read-switch')

function syncPages() {
    let totalPages = parseInt(totalPagesInput.value)
    let pagesRead = parseInt(pagesReadInput.value)

    pagesReadInput.value = Math.min(totalPages, pagesRead)
    pagesRead = parseInt(pagesReadInput.value)

    finishedSwitch.checked = totalPages <= pagesRead
}

function initSyncPages() {
    finishedSwitch.addEventListener('change', () => {
        const totalPages = parseInt(totalPagesInput.value, 10) || 0

        if (finishedSwitch.checked) {
            pagesReadInput.value = totalPages
        } else {
            pagesReadInput.value = Math.max(0, pagesReadInput.value - 1)
        }

        syncPages()
    })

    totalPagesInput.addEventListener('input', syncPages)
    pagesReadInput.addEventListener('input', syncPages)

    syncPages()
}

export { syncPages, initSyncPages }
