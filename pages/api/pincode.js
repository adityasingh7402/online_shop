import pincodes from '../../pincodes.json'

export default function handler(req, res) {
    // let pincode = 

    res.status(200).json(pincodes)
}