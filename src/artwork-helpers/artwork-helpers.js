


export const addArtworkToGalleries = (artwork = [], galleryId) => (
  (!galleryId) 
  ? artwork 
  : artwork.filter(artpiece => artpiece.gallery_id == galleryId)
)
 

export const findArtpiece = (artwork=[], artpieceId) => (
  artwork.find(artpiece => artpiece.id == artpieceId)
)

export const findGallery = (galleries=[], galleryId) => (
  galleries.find(gallery => gallery.id == galleryId)
)
export const artpieceAverageRating = (rating=[]) => {
  let total = 0;
  let result;
  if(rating.length > 0) {
    for (let i =0; i < rating.length; i++){
      total += Number(rating[i])
    }  
    result = Math.ceil((total/rating.length)*2)/2
  }
  else {
    result = 'Not Rated'
  } 

  return result
}

