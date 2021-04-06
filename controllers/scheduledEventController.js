var ScheduledEvent = require('../models/scheduledEventModel');

exports.getAll = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.getFacebook = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.updateFacebook = async(req, res) => {};  

exports.getInstagram = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.updateInstagram = async(req, res) => {}; 
  
exports.getPintrest = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.updatePintrest = async(req, res) => {};   

exports.getReddit = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.updateReddit = async(req, res) => {}; 
  
exports.getTwitter = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.updateTwitter = async(req, res) => {}; 

exports.getYoutube = async(req, res) => {
    try {
        const scheduledEvent = await ScheduledEvent.fetchPastEvents(req.params.id);
        res.send(scheduledEvent);
    } catch(err) {
        console.log('ERROR: ', err.stack);
        res.send(err);
    }
};

exports.updateYoutube = async(req, res) => {};