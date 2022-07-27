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

    res.json({
        ok:true,
        msg: 'actualizarMedicos'
    })
};

const borrarMedico = async ( req, res = response) => {

    res.json({
        ok:true,
        msg: 'borrarMedicos'
    })

};

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}