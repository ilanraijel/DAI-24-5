import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PeliculaTabla = process.env.DB_TABLA_PELICULAS;

export class PeliculaService {

    getPelicula = async (nombre, edad) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);

        if(nombre && edad){

            const response = await pool.request()

                .input('Nombre',sql.VarChar, nombre)
                .input('Edad',sql.VarChar, edad)

            .query(`SELECT * from ${Peliculas} where nombre = @nombre and edad = @edad`);

        }else if(nombre && !edad){

            const response = await pool.request()

                .input('Nombre',sql.VarChar, nombre)

            .query(`SELECT * from ${Peliculas} where nombre = @nombre`);

        }else if(!nombre && edad){

            const response = await pool.request()

                .input('Edad',sql.VarChar, edad)

            .query(`SELECT * from ${Peliculas} where edad = @edad`);

        }else{

            const response = await pool.request()
            .query(`SELECT * from ${Peliculas}`);

        }

        console.log(response);
        return response.recordset;

    }

    getPeliculaById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        
            .input('id',sql.Int, id)
            .query(`SELECT * from ${Peliculas} where id = @id`);

        console.log(response)

        return response.recordset[0];
    }
    
    createPelicula = async (Pelicula) => {

        console.log('This is a function on the service');
        console.log(Pelicula)

        const pool = await sql.connect(config);
        const response = await pool.request()

            .input('Imagen',sql.VarChar, Pelicula?.imagen ?? '')
            .input('Titulo',sql.VarChar, Pelicula?.titulo ?? '')
            .input('Fechadecreacion',sql.Date, Pelicula?.fechadecreacion ?? '')
            .input('Calificacion',sql.Int, Pelicula?.calificacion ?? '')
            .input('Personajesasociados',sql.VarChar, Pelicula?.personajesasociados ?? '')
            .query(`INSERT INTO ${Pelicula}(Imagen, Titulo, Fechadecreacion, Calificacion, Personajesasociados) VALUES (@Imagen, @Titulo, @Fechadecreacion, @Calificacion, @Personajesasociados)`);

        console.log(response)

        return response.recordset;
    }

    deletePeliculaById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()

            .input('id',sql.Int, id)
            .query(`DELETE FROM ${Peliculas} WHERE id = @id`);
            
        console.log(response)

        return response.recordset;
    }
}