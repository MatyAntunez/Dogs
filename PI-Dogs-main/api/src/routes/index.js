const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament, DogTemperaments } = require('../db');
const { Op } = require('sequelize');
const Temperaments = require('../models/Temperaments');
const router = Router();
const {
    API_KEY
} = process.env;

//------------ME TRAIGO LA INFO QUE NECESITO DE LA API------------------------------

const getApiInfo = async () => {
    const apiArr = await axios.get(`https://api.thedogapi.com/v1/breeds?=api_key=${API_KEY}`);
    //console.log("ESTO ME DEVUELVE LA API: ", apiArr.data);

    const apiInfo = await apiArr.data.map((e) => {
        return {
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            image: e.image.url,
            temperament: e.temperament,
        }
    })
    return apiInfo;
};

//------------ ME TRAIGO LA INFO DE LA BASE DE DATOS--------------------------------

const getDbInfo = async () => {
    return await Dog.findAll({
        include: { 
            model: Temperament,
            attributes: ['name'],
            through: { 
                attributes: []
            }
        }
    })
};
//--------------------------------------------------------------

const getAll = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
};
//----------------------------------------------------------------

router.get("/dogs", async (req, res) => {
   try { const { name } = req.query;
    let totalDogs = await getAll();
    if (name) {
        let dogName = await totalDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send("Raza de perro no encontrada!");
    } else {
        totalDogs = totalDogs.map(e => {
            return {
                id:e.id,
                image: e.image,
                name: e.name,
                temperament: e.temperament,
                weight: e.weight,
                height: e.height,
                life_span: e.life_span
            
                //createdInDb: false
            }
        })
       //await Dog.bulkCreate( totalDogs);
        res.status(200).send(totalDogs)
    }
} catch(error){
    console.log('AQUI ME HAGO PINGO HNO____\n' + error.message + error.filename + error.lineNumber + error.stack);
}

});

router.get("/dogsdb", async (req, res) => {
    
     let totalDogs = await getDbInfo();
         res.status(200).send(totalDogs)
 });

 
router.get("/dogsapi", async (req, res) => {
    
    let totalDogs = await getApiInfo();
        res.status(200).send(totalDogs)
});
 

//--------------------------------------------------------------

router.get("/dog/:id", async (req, res) => {

    const { id } = req.params;

    let razaId = await getAll();
    if (id) {
        let raza = await razaId.filter(e => e.id == id)
        // console.log(raza[0].id) 
        raza.length ?
            res.status(200).json(raza) :
            res.status(404).send("Raza de perro no encontrada para id indicado!");
    }
});

//--------------------------------------------------------------------

const getApi = async () => {
    const apiArr = await axios.get(`https://api.thedogapi.com/v1/breeds?=api_key=${API_KEY}`);


    const apiInfo = apiArr.data.map((e) => {
        return {
            temperament: e.temperament,
        }

    })
    // console.log(apiInfo)
    return apiInfo

};

//----------------------------------------------------------------------------------
 router.get("/temperament", async (req, res) => {
    const temperamentsApi = await axios.get(
      "https://api.thedogapi.com/v1/breeds"
    );
  
    //Se convierten los temperamentos de string a arreglo
    const temperaments = temperamentsApi.data.map((el) =>
      el.temperament ? el.temperament.split(",") : ["Desconocida"]
    );
  
    // Se recorre el arreglo de razas y luego el de temperamentos en cada una
    //de las razas, para llevarlos a un solo arreglo y llevarlo a l abase de datos
    let tempEach = [];
    for (let i = 0; i < temperaments.length; i++) {
      for (let j = 0; j < temperaments[i].length; j++) {
        tempEach.push(temperaments[i][j].trim());
      }
    }
  
    for (let i = 0; i < tempEach.length; i++) {
      if (tempEach[i] !== "Desconocida") {
        Temperament.findOrCreate({
          where: { name: tempEach[i] },
        });
      }
    }
  
    const allTemperaments = await Temperament.findAll({ order: [['name', 'ASC'],] });
  
    // const allTemperaments = await Temperament.findAll(
    //   { where: { name: { [Op.ne]: "Desconocida" } }} ,{ order: [['name', 'ASC'],] }
    // );
  
    allTemperaments.length
      ? res.status(200).json(allTemperaments)
      : res.status(404).send("No hay temperamentos para mostrar");
  });



// router.get("/temperament", async (req, res) => {

//    // const allTemperaments = async () => {
       

//         //if (!array.length) {
//             let apiTemperaments = await getApi();
//             //console.log(apiTemperaments)  // AQUI TENGO EL ARRAY DE OBJETOS TEMPERAMENTOS
//             apiTemperaments.map(e => {
//                 let temperamentos = new String(e.temperament) //AQUI LE INDICO QUE EL STRING QUE RECIBO LO CONVIERTA DE STRING PRIMITIVO A UNA NUEVA INSTANCIA DE OBJETO STRING
//                 temperamentos.split(", ").forEach(e => {
//                     !array.includes(e) ? array.push(e) : "TEMPERAMENT ENCONTRADO"
//                 })
//                 array.forEach(e => {
//                     Temperament.findOrCreate({
//                         where: { name: e }
//                     })
//                 })
//             })
//        // }
//         //console.log(array)
//        // return array
//        const allTemperaments = await Temperament.findAll({ order: [['name', 'ASC'],] });
//     //}
//     res.json( allTemperaments)
// })

//-----------------------------------------------------------------

router.post("/dog", async (req, res) => { 
    let {name, height, weight, life_span,temperament, createdInDb, image, } = req.body;
    console.log(`______AQUI_TROLE___________\n ${image}, ${height}, ${weight}, ${life_span}`)
     let dogCreated = await Dog.create({
        name,
        height,
        weight,
        life_span,
        createdInDb,
        image
     })
     let temperamentDb = await Temperament.findAll({
         where: { name: temperament,}
     })
     dogCreated.addTemperament(temperamentDb)
     res.send("DOG CREADO CON EXITO") 
})


 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
