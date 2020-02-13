/** 
 *  --- Boas Práticas ---
 * Os 5 métodos fundamentais no Controller. Só podem ter esse métodos. 
 * INDEX: Uma lista daquele recurso.
 * SHOW: Retornar um único daquele recurso.
 * STORE: Criar um recurso.
 * UPDATE: Atualizar um recurso.
 * DELETE: Excluir um recurso.
*/

const Movie = require('../models/Movie');

module.exports = {

    index(req, res) {
        Movie.find({}).exec((err, movies) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!movies.length) {
                return res
                    .status(404)
                    .json({ success: false, error: 'Movie not found' })
            }

            return res.status(200).json({ success: true, data: movies })
        })
    },

    show(req, res) {
        Movie.findById(req.params.id).exec((err, movie) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!movie) {
                return res
                    .status(404)
                    .json({ success: false, error: `Movie not found` })
            }

            return res.status(200).json({ success: true, data: movie })
        })
    },

    store(req, res) {
        const body = req.body;

        if(!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a movie'
            })
        }

        Movie.create(body, (err, movie) => {
            if(err) {
                return res.status(500).json({                     
                    success: false, 
                    message: 'Movie not created!',
                    error: err 
                })
            }

            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
    },

    update(req, res) {
        const body = req.body;

        if(!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update',
            })
        }

        Movie.findByIdAndUpdate(req.params.id, { $set: body }).exec((err, movie) => {
            if(err) {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!'
                });                
            }

            if (!movie) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Movie not found'
                })
            }

            return res.status(200).json({
                success: true,
                id: movie._id,
                message: 'Movie updated!',
            });
        })
    },

    delete(req, res) {
        Movie.findByIdAndDelete(req.params.id).exec((err, movie) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!movie) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Movie not found' 
                })
            }

            return res.status(200).json({ 
                success: true, 
                data: movie
            })
        })
    }
}