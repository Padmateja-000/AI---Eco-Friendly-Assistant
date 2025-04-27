document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Mock eco-product database
    const ecoProducts = [
        { name: "Bamboo Toothbrush", brand: "EcoGood", price: 4.99, score: 9, reason: "100% biodegradable" },
        { name: "Organic Cotton Tote", brand: "GreenWear", price: 12.99, score: 8, reason: "Fair trade certified" }
    ];

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

    function sendMessage() {
        const query = userInput.value.trim();
        if (!query) return;

        addMessage(query, 'user');
        userInput.value = '';

        // Show typing indicator
        const thinkingMessage = addMessage("Thinking...", 'bot');

        // Call the backend server
        fetch('http://localhost:3000/chat', { // Use local backend server for now
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: query
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                thinkingMessage.querySelector('.message-content p').innerHTML = data.message;
            } else {
                fallbackResponse(query, thinkingMessage);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            fallbackResponse(query, thinkingMessage);
        });
    }

    function fallbackResponse(query, messageElement) {
        const matchedProducts = ecoProducts.filter(p => 
            query.toLowerCase().includes(p.name.toLowerCase()) || 
            query.toLowerCase().includes(p.brand.toLowerCase())
        );

        if (matchedProducts.length > 0) {
            const productList = matchedProducts.map(p => 
                `${p.name} by ${p.brand} ($${p.price}) - ${p.reason}` 
            ).join('<br>');
            messageElement.querySelector('.message-content p').innerHTML = `Eco-friendly options:<br>${productList}`;
        } else {
            messageElement.querySelector('.message-content p').innerHTML = `Sorry, I couldn't find anything. Try asking about "vegan", "plastic-free", or "organic" products!`;
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i></div>
            <div class="message-content"><p>${text}</p></div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    }
});
