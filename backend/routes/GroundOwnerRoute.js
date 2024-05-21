import express from "express";
import {getAllTournamentsByCategory, GetOwnerByID,createManyGroundOwners,GetOwnerByEmail,getGroundsByCategory,getTop5LatestTournaments,getAllTournaments,getAllGroundOwnersWithGroundNames,getAllGroundOwnersWithGroundAndTournamentNames ,createGroundOwner,getAllGroundOwnerNames,getOwnerByEmail,markSlotBooked} from "../controller/GroundOwner.js";

const router = express.Router();



import multer from "multer";
import path from "path";




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use forward slashes in the path and remove the typo
        return cb(null, "E:/SportsArensProject/backend/public/Posters");
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})



router.get("/", getAllTournaments);
router.post("/signup", createGroundOwner);
router.get("/:category",getAllTournamentsByCategory)
router.get('/grounds/:category',getGroundsByCategory)
router.post('/newOwners',createManyGroundOwners)
router.get('/getOwner/:email',getOwnerByEmail)
router.post('/BookSlot',markSlotBooked)
router.get('/login/:email',GetOwnerByEmail)
router.get('/GetOwnerById/:id',GetOwnerByID)


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