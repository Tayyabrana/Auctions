const ArtworkAuthentication = require("../Models/artworkAuthentication");

const RegisterArtworkAuthentication = async (req, res) => {
    try {
        const seller = res.locals.payload.id;
        const { artwork, reason } = req.body;
        const artworkData = await ArtworkAuthentication.create({
            seller,
            artwork,
            reason
        });
        res.status(201).json({ artworkData });

    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}


// const GetAllAuthenticatedArtwork = async (req, res) => {
//     try {
//         const artworkAuthenticated = await ArtworkAuthentication.findById();
//         if (artworkAuthenticated && artworkAuthenticated.length > 0) {
//             res.status(200).json(artworkAuthenticated);
//         }
//         else {
//             res.status(404).send('No Authenticated Artworks Found');
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//         throw error;
//     }
// };

const GetAll = async (req, res) => {
    try {
        const products = await ArtworkAuthentication.find();
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('No Pending Products Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const ApproveArtwork = async (req, res) => {
    try {
        const { id } = req.params
        await ArtworkAuthentication.findByIdAndUpdate(id, { status: "approved" })
        res.status(200).json({ update: true });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

const RejectArtwork = async (req, res) => {
    try {
        const { id } = req.params
        await ArtworkAuthentication.findByIdAndUpdate(id, { status: "rejected" })
        res.status(200).json({ update: true });
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
}

module.exports = {
    RegisterArtworkAuthentication,
    GetAll,
    ApproveArtwork,
    RejectArtwork
};

