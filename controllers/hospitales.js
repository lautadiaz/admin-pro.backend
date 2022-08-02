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

    const id  = req.params.id;
    const uid = req.uid;
    
    try {

        // Reviso que existe el hospital
        const hospitalDB = await Hospital.findById( id );

        if(!hospitalDB) {
            return  res.status(404).json({
                    ok: false,
                    msg: 'No existe un hospital con ese id',
            });
        } 

        // Actualizaciones
        const cambiosHopital = {
            ...req.body,
            usuario: uid
        }
            
        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHopital, { new: true} );
        
        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

    
};

const borrarHospital = async ( req, res = response) => {

    const id = req.params.id

    try {

        // Reviso que existe el hospital
        const hospitalDB = await Hospital.findById( id );

        if(!hospitalDB) {
            return  res.status(404).json({
                    ok: false,
                    msg: 'No existe un hospital con ese id'
                });
        }

        await Hospital.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

};

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}