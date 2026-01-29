const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data.json');

// Initialize DB file if not exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({
        projects: [],
        clients: [],
        contacts: [],
        subscribers: []
    }, null, 2));
}

const readDB = () => {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = {
    get: (collection) => {
        const db = readDB();
        return db[collection] || [];
    },
    add: (collection, item) => {
        const db = readDB();
        if (!db[collection]) db[collection] = [];
        const newItem = { _id: Date.now().toString(), ...item, date: new Date() };
        db[collection].push(newItem);
        writeDB(db);
        return newItem;
    },
    find: (collection, query) => {
        const db = readDB();
        if (!db[collection]) return [];
        // Simple exact match for query keys
        return db[collection].filter(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }
};
