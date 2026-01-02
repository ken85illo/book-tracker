// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const editButtons = document.querySelectorAll('.edit-btn')

editButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
        const bookId = btn.dataset.id
        if (!bookId) return

        try {
            const response = await fetch(`/Home/GetBook?id=${bookId}`)
            if (!response.ok) throw new Error('Book not found')

            const data = await response.json()

            document.querySelector('#book-id').value = data.id
            document.querySelector('#book-title').value = data.title
            document.querySelector('#book-author').value = data.author
            document.querySelector('#publish-year').value = data.year
            document.querySelector('#total-pages').value = data.totalPages
            document.querySelector('#pages-read').value = data.pagesRead
            document.querySelector('#synopsis').value = data.description
            syncPages()
        } catch (err) {
            console.error('Error loading book:', err)
        }
    })
})

const form = document.getElementById('bookForm')

form.addEventListener('submit', async (e) => {
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    e.preventDefault()

    const formData = new FormData(form)
    console.log(formData)
    try {
        const response = await fetch('/Home/Index', {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) throw new Error('Failed to submit')

        bootstrap.Modal.getInstance(document.getElementById('formModal')).hide()

        // Add delay before realoading
        setTimeout(() => {
            location.reload()
            form.reset()
        }, 300)
    } catch (err) {
        console.error(err)
    }
})

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

const btnAll = document.querySelector('#all')
const btnRead = document.querySelector('#read')
const btnUnread = document.querySelector('#unread')
const searchInput = document.querySelector(".search-div input[type='search']")

const bookCards = Array.from(document.querySelectorAll('.book-card'))

const filterBooks = () => {
    const searchText = searchInput.value.toLowerCase()
    const filterType = btnRead.checked
        ? 'read'
        : btnUnread.checked
          ? 'unread'
          : 'all'

    let literaryWorks = 0

    bookCards.forEach((card) => {
        const title =
            card.querySelector('.title-display')?.innerText.toLowerCase() || ''
        const author =
            card.querySelector('.author-display')?.innerText.toLowerCase() || ''

        const checkbox = card.querySelector('#read-checkbox')
        const isRead = checkbox?.checked || false

        let matchesFilter = false
        if (filterType === 'all') matchesFilter = true
        else if (filterType === 'read' && isRead) matchesFilter = true
        else if (filterType === 'unread' && !isRead) matchesFilter = true

        const matchesSearch =
            title.includes(searchText) || author.includes(searchText)

        if (matchesFilter && matchesSearch) {
            card.style.display = ''
            ++literaryWorks
        } else {
            card.style.display = 'none'
        }
    })

    document.querySelector('#literary-works').textContent = literaryWorks
}

;[btnAll, btnRead, btnUnread].forEach((btn) =>
    btn.addEventListener('change', filterBooks)
)
searchInput.addEventListener('input', filterBooks)

filterBooks()
