const { response } = require('express');
const bcrypt = require('bcryptjs');

const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');


const getHospital = async (req, res) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img')

    res.json({
        ok:true,
        hospitales
    })
};

const crearHospital = async (req, res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body 
    });

    try {

        const hospitalDB = await hospital.save();
        
        res.json({
            ok:true,
            hospital: hospitalDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
};

const actualizarHospital = async ( req, res = response) => {

    res.json({
        ok:true,
        msg: 'actualizarHospitales'
    })
};

const borrarHospital = async ( req, res = response) => {

    res.json({
        ok:true,
        msg: 'borrarHospitales'
    })

};

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}