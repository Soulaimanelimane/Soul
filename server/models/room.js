import mongoose  from "mongoose";

const Schema = mongoose.Schema ;

const roomSchema = new Schema({
    idroom:{
        type : Number , 
        required: [true , 'room cannot be created whitout id :(']
    } , 
    creator:{
        type : String , 
        required : [true , 'we need  a creater to create a room :(']
    } ,
    roomName :{
        type : String , 
        required : [true , 'we need a name for this room ']
    },
    messages: {
        type : Array , 
        required:[false , 'messages are required in room ']
    }, 
    DayCreated : {
        type : Date , 
        required:[false ]
    } ,
    locationCreated :{
        type : String , 
        required:[true , 'location of is required ' ]
    } 
}); 
const Room = mongoose.model('Room' , roomSchema ) ;
export default Room ; 
 