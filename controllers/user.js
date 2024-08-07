const User = require('../models/user');

async function handleGetAllUser(req,res) {
    const alldbUser = await User.find({});
    //always use X in front of custome header
    res.header('X-MyName', 'AyushSahu');
    res.status(200).json(alldbUser);
}


async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404).json({msg:`user not found with this id ${req.params.id}`});
    }
    res.status(200).json(user);
}

async function handleUpdateUserById(req,res) {
    if (req.body && req.body.last_name) {
        await User.findByIdAndUpdate(req.params.id, { last_name: req.body.last_name });
        res.status(200).json({ msg: `${req.params.id}record updated successfully` });
    } else {
        res.status(400).json({ msg: `please pass last_name` });
    }
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'user deleted successfully' });
}

async function handleCreateNewUser(req,res) {
    const body = req.body;
    if (!body || !body.email || !body.first_name) {
        res.status(400).json({ msg: 'Send all the details' });
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });

    res.status(201).json({ msg: 'Success user created',id:result._id });
}


module.exports = {handleGetAllUser,handleGetUserById,handleUpdateUserById,handleDeleteUserById,
    handleCreateNewUser}