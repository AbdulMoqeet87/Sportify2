import express from "express";
import {getAllTournamentsByCategory, createManyGroundOwners,getGroundsByCategory,getTop5LatestTournaments,getAllTournaments,getAllGroundOwnersWithGroundNames,getAllGroundOwnersWithGroundAndTournamentNames ,createGroundOwner,getAllGroundOwnerNames} from "../controller/GroundOwner.js";

const router = express.Router();



import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination path to the Posters folder in the project's public directory
        cb(null, path.join("E:/TailwindprojectTesting/my-project/public/Posters"));
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using the current timestamp and original filename
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get("/", getAllTournaments);
router.post("/", createGroundOwner);
router.get("/:category",getAllTournamentsByCategory)
router.get('/grounds/:category',getGroundsByCategory)
router.post('/newOwners',createManyGroundOwners)
router.post('/upload', upload.single(`file`), (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);
        res.status(200).json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ success: false, error: "File upload failed" });
    }
});

export default router;