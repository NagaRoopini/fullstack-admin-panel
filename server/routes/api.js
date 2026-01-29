const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Models
const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');
const dbFallback = require('../utils/dbFallback');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// --- Helper Functions ---
const isMongo = () => global.hasMongoDB;

// --- Projects ---
router.get('/projects', async (req, res) => {
    try {
        if (isMongo()) {
            const projects = await Project.find();
            res.json(projects);
        } else {
            res.json(dbFallback.get('projects'));
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/projects', upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (isMongo()) {
        const project = new Project({ name, description, image });
        try {
            const newProject = await project.save();
            res.status(201).json(newProject);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        const newProject = dbFallback.add('projects', { name, description, image });
        res.status(201).json(newProject);
    }
});

// --- Clients ---
router.get('/clients', async (req, res) => {
    try {
        if (isMongo()) {
            const clients = await Client.find();
            res.json(clients);
        } else {
            res.json(dbFallback.get('clients'));
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/clients', upload.single('image'), async (req, res) => {
    const { name, designation, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (isMongo()) {
        const client = new Client({ name, designation, description, image });
        try {
            const newClient = await client.save();
            res.status(201).json(newClient);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        const newClient = dbFallback.add('clients', { name, designation, description, image });
        res.status(201).json(newClient);
    }
});

// --- Contact Form ---
router.post('/contact', async (req, res) => {
    const { fullName, email, mobile, city } = req.body;

    if (isMongo()) {
        const contact = new Contact({ fullName, email, mobile, city });
        try {
            const newContact = await contact.save();
            res.status(201).json(newContact);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        const newContact = dbFallback.add('contacts', { fullName, email, mobile, city });
        res.status(201).json(newContact);
    }
});

router.get('/contact', async (req, res) => {
    try {
        if (isMongo()) {
            const contacts = await Contact.find().sort({ date: -1 });
            res.json(contacts);
        } else {
            res.json(dbFallback.get('contacts'));
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Newsletter ---
router.post('/newsletter', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    if (isMongo()) {
        const existing = await Subscriber.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already subscribed" });

        const subscriber = new Subscriber({ email });
        try {
            const newSubscriber = await subscriber.save();
            res.status(201).json(newSubscriber);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        const existing = dbFallback.find('subscribers', { email });
        if (existing.length > 0) return res.status(409).json({ message: "Email already subscribed" });

        const newSubscriber = dbFallback.add('subscribers', { email });
        res.status(201).json(newSubscriber);
    }
});

router.get('/newsletter', async (req, res) => {
    try {
        if (isMongo()) {
            const subscribers = await Subscriber.find().sort({ date: -1 });
            res.json(subscribers);
        } else {
            res.json(dbFallback.get('subscribers'));
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
