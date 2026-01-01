import { syncPages } from './syncPages'

function initEditButtons() {
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
}

export { initEditButtons }
