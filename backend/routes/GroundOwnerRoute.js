import express from "express";
import {createGround,GetBookedGrounds,RegisterTournament,UpdateRating,createTournament,GetMyGrounds,GetGroundByID,getReviewsOfGround,AddReview,AddManyReviews,AddRating,getAllGroundOwnersDetails,AddSlot,getAllTournamentsByCategory, GetOwnerByID,createManyGroundOwners,GetOwnerByEmail,getGroundsByCategory,getTop5LatestTournaments,getAllTournaments,getAllGroundOwnersWithGroundNames,getAllGroundOwnersWithGroundAndTournamentNames ,createGroundOwner,getAllGroundOwnerNames,getOwnerByEmail,markSlotBooked,UdpateOwner} from "../controller/GroundOwner.js";
import { GroundOwner } from "../models/GroundOwnerSchema.js";
const router = express.Router();



import multer from "multer";
import path from "path";




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
        
//         return cb(null, "E:/SportsArensProject/backend/public/Posters");
//     },
//     filename:function(req,file,cb){
//         return cb(null,`${Date.now()}_${file.originalname}`)
//     }
// })
// const upload = multer({storage})

router.get("/", getAllTournaments);
router.post("/signup", createGroundOwner);
router.get("/:category",getAllTournamentsByCategory)
router.get('/grounds/:category/:id',getGroundsByCategory)
router.post('/newOwners',createManyGroundOwners)
router.get('/getOwner/:email',getOwnerByEmail)
router.post('/BookSlot',markSlotBooked)
router.get('/login/:email',GetOwnerByEmail)
router.get('/GetOwnerById/:id',GetOwnerByID)
router.get('/GetBookedGrounds/:id',GetBookedGrounds)
router.get('/GetGroundById/:id',GetGroundByID)
router.patch('/UpdateOwner/:id',UdpateOwner)
router.patch('/:ownerId/Ground/:groundId/Slot',AddSlot )
router.get('/GroundOwners', getAllGroundOwnersDetails)
router.get('/getReviews/:id',getReviewsOfGround)
router.patch('/:ownerId/Ground/:groundId/Rating',AddRating )
router.patch('/:ownerId/Ground/:groundId/Review',AddManyReviews )
router.post('/AddReview',AddReview)
router.post('/UpdateRating',UpdateRating)
router.post('/TournamentRegistration',RegisterTournament)
router.get('/groundsById/:id',GetMyGrounds)

const storagePoster = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("insideStorage")
         cb(null, "E:/DATA/Documents/DS/Sportify2/frontend/public/Posters");
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}`)
    }
    
});

// const storageSchedule = multer.diskStorage(
    
//     {
//     destination: function (req, file, cb) {
//         console.log("insideSchedule")
//         cb(null, "E:/SportsArensProject/backend/public/Posters");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     }
// })

const uploadPoster = multer({storage: storagePoster });
//const uploadSchedule = multer({ storage: storageSchedule });

/* This route `router.post('/tournaments/;g_id', upload.single(`file`), (req, res) => { ... }` is
handling POST requests to the endpoint `/tournaments/;g_id`. */
// router.post('/tournaments/;g_id', upload.single(`file`), (req, res) => {
//     try {
//         console.log(req.body);
//         console.log(req.file);
//         res.status(200).json({ success: true, message: "File uploaded successfully" });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).json({ success: false, error: "File upload failed" });
//     }
// });

router.post('/tournaments/:g_id', uploadPoster.single('PosterPath'),createTournament); 

const G_ImgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'E:/DATA/Documents/DS/Sportify2/frontend/public/images');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const G_Image = multer({storage: G_ImgStorage });
  router.post('/CreateGround/:id', G_Image.single('Image'),createGround); 
export default router;