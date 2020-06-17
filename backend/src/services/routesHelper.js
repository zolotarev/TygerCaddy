import { accessLevels } from "../config/config";

const allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        const { roles } = req.user[0].dataValues;
        const rolesArray = roles.split(';')
        const authorised = rolesArray.some(item => accessLevel.includes(item))
        if(!authorised){
            res.status(403).json({ msg: 'You do not have access to this'})
            return;
        }

        callback(req, res)
    }

    return checkUserRole;
}

export { allowOnly }