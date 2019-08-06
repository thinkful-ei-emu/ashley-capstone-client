


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
  

