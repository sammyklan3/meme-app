function generateUniqueId (length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters[randomIndex];
    }

    return uniqueId;
}

// Export the generateUniqueId function
module.exports = generateUniqueId;