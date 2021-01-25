const find_dest = (req,res)=>{
    //parse the source and dest from the URL
    const source = req.params.source;
    const dest = req.params.dest;
    //check if it exsists in the database
    Distance.findOne( { source: source, destination: dest } ).select('distance -_id')
    .then((result)=>{
        //if it does not exist in the database:
       if(!result){
            //if the combination does not exist, or can't connect to the database, get the information from the googleMaps API using axios to connect to the database
            axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+source+'&destinations='+dest+'&key=AIzaSyCYQyExRU_lUN9QtYoTa5w1nfsACiwoz44')
            .then(response => {
                const distResult = response.data.rows[0].elements[0].distance.text
                //create a new instance 
                const combo= new Distance (
                    {
                    source: source,
                    destination: dest,
                    distance: parseInt(distResult),
                    hits: 0
                    }
                    )
                    //if we are connected to the databse, then save the new information
                    if(mongoose.connection.readyState==1){
                        combo.save()
                    }
            })
            .catch(error => console.log('Error', error));
       } //find in the database and send the result 
    }) 
    Distance.findOneAndUpdate( { source: source, destination: dest }, {$inc: {hits:1}}, {returnNewDocument: true}).select('distance -_id')
    .then((result)=>{
        res.send(result) 
    })
    .catch((err)=> {
         console.log("error " + err);
         });
    
};