// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener('DOMContentLoaded', () => {
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
            form.reset()

            bootstrap.Modal.getInstance(
                document.getElementById('formModal')
            ).hide()

            // Add delay before realoading
            setTimeout(() => {
                location.reload()
            }, 300)
        } catch (err) {
            console.error(err)
        }
    })
})
