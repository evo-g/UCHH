'use strict';
const axios = require('axios');
const sendSMS = require('../util/sendSMS');

module.exports = function (Visit) {
    Visit.beforeCreate = (next, instance) => {
        Visit.app.models.Staff.findOne({ where: { id: instance.staffId } })
            .then(doc => {
                Visit.app.models.Room.findOne({ where: { id: instance.roomId } })
                    .then(room => {
                        Visit.app.models.Patient.findOne({ where: { roomId: room.id } })
                            .then(patient => {
                                sendSMS(`${doc.title} ${doc.lastName} visited ${patient.firstName} at ${instance.timestamp}`, patient);
                            })
                    })
            })
        next();
    }
};
