import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PersonajeTabla = process.env.DB_TABLA_PERSONAJES;

export class PersonajeService {

    getPersonaje = async (nombre, edad) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);

        if(nombre && edad){

            const response = await pool.request()

                .input('Nombre',sql.VarChar, nombre)
                .input('Edad',sql.VarChar, edad)

            .query(`SELECT * from ${Personajes} where nombre = @nombre and edad = @edad`);

        }else if(nombre && !edad){

            const response = await pool.request()

                .input('Nombre',sql.VarChar, nombre)

            .query(`SELECT * from ${Personajes} where nombre = @nombre`);

        }else if(!nombre && edad){

            const response = await pool.request()

                .input('Edad',sql.VarChar, edad)

            .query(`SELECT * from ${Personajes} where edad = @edad`);

        }else{

            const response = await pool.request()
            .query(`SELECT * from ${Personajes}`);

        }

        console.log(response);
        return response.recordset;

    }

    getPersonajeById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        
            .input('id',sql.Int, id)
            .query(`SELECT * from ${Personajes} where id = @id`);

        console.log(response)

        return response.recordset[0];
    }
    
    createPersonaje = async (Personaje) => {

        console.log('This is a function on the service');
        console.log(Personaje)

        const pool = await sql.connect(config);
        const response = await pool.request()

            .input('Imagen',sql.VarChar, Personaje?.imagen ?? '')
            .input('Nombre',sql.VarChar, Personaje?.nombre ?? '')
            .input('Edad',sql.VarChar, Personaje?.edad ?? '')
            .input('Peso',sql.VarChar, Personaje?.peso ?? '')
            .input('Historia',sql.VarChar, Personaje?.historia ?? '')
            .input('Imagen',sql.VarChar, Personaje?.peliculaoserieasociada ?? '')
            .query(`INSERT INTO ${Personajes}(Imagen, Nombre, Edad, Peso, Historia, Pelicula o serie asociada) VALUES (@Imagen, @Nombre, @Edad, @Peso, @Historia, @Pelicula o serie asociada)`);

        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()

            .input('id',sql.Int, id)
            .query(`DELETE FROM ${Personajes} WHERE id = @id`);
            
        console.log(response)

        return response.recordset;
    }
}