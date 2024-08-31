const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 8080;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

// Set up a directory for storing resumes
const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes');  // Directory to save resumes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // File name with timestamp
    }
});

const upload = multer({ storage: resumeStorage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res) => {
    res.render("index");  // Ensure 'res.render' is used
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", upload.single('resume'), async (req, res) => {
    try {
        const newUser = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            resume: req.file.path  // Store the file path in MongoDB
        });

        const registered = await newUser.save();
        res.status(201).render("index");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});
