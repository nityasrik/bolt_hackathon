const axios = require('axios');

async function testSpeak() {
    try {
        const response = await axios.post('http://localhost:5000/speak', {
            text: 'Hello world'
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        });

        console.log('✅ Success! Audio length:', response.data.length, 'bytes');
    } catch (error) {
        console.log('❌ Error:', error.response?.data?.toString() || error.message);
    }
}

testSpeak(); 