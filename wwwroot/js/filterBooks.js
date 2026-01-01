function initBooksFilter() {
    const btnAll = document.querySelector('#all')
    const btnRead = document.querySelector('#read')
    const btnUnread = document.querySelector('#unread')
    const searchInput = document.querySelector(
        ".search-div input[type='search']"
    )

    const bookCards = Array.from(document.querySelectorAll('.book-card'))

    const filterBooks = () => {
        const searchText = searchInput.value.toLowerCase()
        const filterType = btnRead.checked
            ? 'read'
            : btnUnread.checked
              ? 'unread'
              : 'all'

        bookCards.forEach((card) => {
            const title =
                card.querySelector('.title-display')?.innerText.toLowerCase() ||
                ''
            const author =
                card
                    .querySelector('.author-display')
                    ?.innerText.toLowerCase() || ''

            const checkbox = card.querySelector('#read-checkbox')
            const isRead = checkbox?.checked || false

            let matchesFilter = false
            if (filterType === 'all') matchesFilter = true
            else if (filterType === 'read' && isRead) matchesFilter = true
            else if (filterType === 'unread' && !isRead) matchesFilter = true

            const matchesSearch =
                title.includes(searchText) || author.includes(searchText)

            card.style.display = matchesFilter && matchesSearch ? '' : 'none'
        })
    }

    ;[btnAll, btnRead, btnUnread].forEach((btn) =>
        btn.addEventListener('change', filterBooks)
    )
    searchInput.addEventListener('input', filterBooks)
}

export { initBooksFilter }
