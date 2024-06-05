import Map from '../models/map.model.js';

export const updateMap = async (req, res, next) => {
  const { mapImgUrl } = req.body;

  try {
    const existingMap = await Map.findOne();

    if (existingMap) {
      existingMap.mapImgUrl = mapImgUrl;
      await existingMap.save();
      res.status(200).json({ message: 'Map image is updated successfully' });
    } else {
      const newMapImage = new Map({ mapImgUrl });
      await newMapImage.save();
      res.status(200).json({ message: 'Map image is created successfully' });
    }
  } catch (error) {
    console.error('Map image error:', error);
    next(error);
  }
};

export const viewMap = async (req, res, next) => {
  try {
    const maps = await Map.find({}, 'mapImgUrl');
    res.json(maps.map((map) => map.mapImgUrl));
  } catch (error) {
    next(error);
  }
};
