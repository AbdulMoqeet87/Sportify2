import mongoose  from "mongoose";

export const dbConnection = ()=>
{
    mongoose.connect(process.env.MONGO_URI,
        {dbName:"SportsArena"}).then(
            ()=>{
                console.log("Connect Hogai Database");
            }
        ).catch(err=>{
            console.log(`Database ma Error hai :  ${err}`);
        });
};

