const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const Medico = require('../models/medicos');


const getMedico = async (req, res) => {

    const medicos = await Medico.find() 
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')

    res.json({
        ok:true,
        medicos
    })
};

const crearMedico = async (req, res = response ) => {
      
    const uid = req.uid;

    const medico = new Medico({ 
        usuario: uid,
        ...req.body 
    });

    try {

        const medicoDB = await medico.save();
        
        res.json({
            ok:true,
            medico: medicoDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

};

const actualizarMedico = async ( req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

   try {

        // Reviso que existe el medico
        const medicoDB = await Medico.findById( id );

        if(!medicoDB) {
            return  res.status(404).json({
                    ok: false,
                    msg: 'No existe un medico con ese id',
            });
        } 

        // Actualizaciones
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
            
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true} );
        
        res.json({
            ok: true,
            hospital: medicoActualizado
        });

    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

const borrarMedico = async ( req, res = response) => {

    const id = req.params.id

    try {

        // Reviso que existe el medico
        const medicoDB = await Medico.findById( id );

        if(!medicoDB) {
            return  res.status(404).json({
                    ok: false,
                    msg: 'No existe un medico con ese id'
                });
        }

        await Medico.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Medico eliminado'
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

};

const getMedicoById = async (req, res) => {

    const id = req.params.id

    try {
        const medico = await Medico.findById(id) 
                                    .populate('usuario','nombre')
                                    .populate('hospital','nombre')
    
        res.json({
            ok:true,
            medico
        })
        
    } catch (error) {
        res.json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
};

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}