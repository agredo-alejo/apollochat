self.addEventListener("push", (e) => {
    const data = e.data.json()

    e.waitUntil(

        self.registration.showNotification(data.title || "New Message", {
            body: data.body || "Hello",
            badge: "/icon-96x96.png",
            icon: "/icon-192x192.png"
        })

    )
})