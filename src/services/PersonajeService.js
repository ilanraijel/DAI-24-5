import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PersonajeTabla = process.env.DB_TABLA_PERSONAJES;

export class PersonajeService {

    getPersonaje = async (nombre, edad) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        let response=0;

        if(nombre && edad){

             response = await pool.request()

                .input('Nombre',sql.VarChar, nombre)
                .input('Edad',sql.VarChar, edad)

            .query(`SELECT * from ${PersonajeTabla} where nombre = @nombre and edad = @edad`);

        }else if(nombre && !edad){

             response = await pool.request()

                .input('Nombre',sql.VarChar, nombre)

            .query(`SELECT * from ${PersonajeTabla} where nombre = @nombre`);

        }else if(!nombre && edad){

             response = await pool.request()

                .input('Edad',sql.VarChar, edad)

            .query(`SELECT * from ${PersonajeTabla} where edad = @edad`);

        }else{

             response = await pool.request()
            .query(`SELECT * from ${PersonajeTabla}`);

        }

        console.log(response);
        return response.recordset;

    }

    getPersonajeById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        
            .input('id',sql.Int, id)
            .query(`SELECT * from ${PersonajeTabla} where id = @id`);

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
            .input('PeliculaAsociada',sql.VarChar, Personaje?.peliculaAsociada ?? '')
            .query(`INSERT INTO ${PersonajeTabla}(Imagen, Nombre, Edad, Peso, Historia, PeliculaAsociada) VALUES (@Imagen, @Nombre, @Edad, @Peso, @Historia, @PeliculaAsociada)`);

        console.log(response)

        return response.recordset;
    }

    updatePersonaje = async (id, Personaje) => {

        console.log('This is a function on the service');
        console.log(id, Personaje)

        const pool = await sql.connect(config);
        const response = await pool.request()

            .input('Imagen',sql.VarChar, Personaje?.imagen ?? '')
            .input('Nombre',sql.VarChar, Personaje?.nombre ?? '')
            .input('Edad',sql.VarChar, Personaje?.edad ?? '')
            .input('Peso',sql.VarChar, Personaje?.peso ?? '')
            .input('Historia',sql.VarChar, Personaje?.historia ?? '')
            .input('PeliculaAsociada',sql.VarChar, Personaje?.peliculaAsociada ?? '')
            .query(`UPDATE TablaPersonaje SET Imagen = @Imagen, Nombre = @Nombre, Edad = @Edad, Peso = @Peso, Historia = @Historia, PeliculaAsociada = @PeliculaAsociada WHERE id = id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()

            .input('id',sql.Int, id)
            .query(`DELETE FROM ${PersonajeTabla} WHERE id = @id`);
            
        console.log(response)

        return response.recordset;
    }
}