export const addArtworkToGalleries = (artwork = [], galleryId) =>
  !galleryId
    ? artwork
    : artwork.filter(artpiece => artpiece.gallery_id === Number(galleryId));

export const findArtpiece = (artwork = [], artpieceId) =>
  artwork.find(artpiece => artpiece.id === Number(artpieceId));

export const findGallery = (galleries = [], galleryId) =>
  galleries.find(gallery => gallery.id === Number(galleryId));
export const artpieceAverageRating = (rating = []) => {
  let total = 0;
  let result;
  if (rating.length > 0) {
    for (let i = 0; i < rating.length; i++) {
      total += Number(rating[i]);
    }
    result = Math.ceil((total / rating.length) * 2) / 2;
  } else {
    result = 'Not Rated';
  }

  return result;
};

export const galleryAverageRating = (artwork = [], galleryId) => {
  let total = 0;
  let result;
  let filteredArtwork = artwork.filter(
    artpiece => artpiece.gallery_id === galleryId
  );

  if (filteredArtwork.length > 0) {
    for (let i = 0; i < filteredArtwork.length; i++) {
      if (filteredArtwork[i].rating.length > 0) {
        console.log('in average function', filteredArtwork[i].rating);
        total += Number(filteredArtwork[i].rating);
        console.log(total);
      } else {
        result = 'Not Rated';
      }
    }
    result = Math.ceil((total / filteredArtwork.length) * 2) / 2;
  } else {
    result = 'Not Rated';
  }

  return result;
};

export const totalArtworkInGallery = (artwork = [], galleryId) =>
  artwork.filter(artpiece => artpiece.gallery_id === galleryId).length;
