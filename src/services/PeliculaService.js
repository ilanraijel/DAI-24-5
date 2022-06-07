import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PeliculaTabla = process.env.DB_TABLA_PELICULAS;

export class PeliculaService {

    getPelicula = async (titulo, calificacion) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);

        if(titulo && calificacion){

            const response = await pool.request()

                .input('Titulo',sql.VarChar, titulo)
                .input('Calificacion',sql.VarChar, calificacion)

            .query(`SELECT * from ${PeliculaTabla} where titulo = @titlulo and calificacion = @califcacion`);

        }else if(titulo && !calificacion){

            const response = await pool.request()

                .input('Titulo',sql.VarChar, titulo)

            .query(`SELECT * from ${PeliculaTabla} where titulo = @titulo`);

        }else if(!titulo && calificacion){

            const response = await pool.request()

                .input('Calificacion',sql.VarChar, edad)

            .query(`SELECT * from ${PeliculaTabla} where calificacion = @calificacion`);

        }else{

            const response = await pool.request()
            .query(`SELECT * from ${PeliculaTabla}`);

        }

        console.log(response);
        return response.recordset;

    }

    getPeliculaById = async (id) => {

        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        
            .input('id',sql.Int, id)
            .input('Imagen',sql.VarChar, Pelicula?.imagen ?? '')
            .input('Titulo',sql.VarChar, Pelicula?.titulo ?? '')
            .input('Fechadecreacion',sql.Date, Pelicula?.fechadecreacion ?? '')
            .input('Calificacion',sql.Int, Pelicula?.calificacion ?? '')
            .input('PersonajeAsociado',sql.Int, Pelicula?.personajeasociado ?? '')
            .query(`SELECT * from ${PeliculaTabla} where id = @id`);

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
            .input('PersonajeAsociado',sql.Int, Pelicula?.personajeasociado ?? '')
            .query(`INSERT INTO ${PeliculaTabla}(Imagen, Titulo, Fechadecreacion, Calificacion, PersonajeAsociado) VALUES (@Imagen, @Titulo, @Fechadecreacion, @Calificacion, @PersonajeAsociado)`);

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