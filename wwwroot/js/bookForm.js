function initBookForm() {
    const form = document.getElementById('bookForm')

    form.addEventListener('submit', async (e) => {
        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }

        e.preventDefault()

        const formData = new FormData(form)
        try {
            const response = await fetch('/Home/Index', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Failed to submit')

            bootstrap.Modal.getInstance(
                document.getElementById('formModal')
            ).hide()

            // Add delay before realoading
            setTimeout(() => {
                location.reload()
                form.reset()
            }, 300)
        } catch (err) {
            console.error(err)
        }
    })
}

export { initBookForm }
