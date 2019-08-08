import config from '../config'

const ArtisteApiService = {
  getGalAndArt() {
    return Promise.all([
      fetch(`${config.API_ENDPOINT}/galleries`),
      fetch(`${config.API_ENDPOINT}/artwork`)
  ])
      .then(([galleriesRes, artworkRes]) => {
          if (!galleriesRes.ok)
              return galleriesRes.json().then(e => Promise.reject(e));
          if (!artworkRes.ok)
              return artworkRes.json().then(e => Promise.reject(e));

          return Promise.all([galleriesRes.json(), artworkRes.json()]);
      })
    
  },

  postGallery(gallery) {
    return fetch(`${config.API_ENDPOINT}/galleries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(gallery),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })

  },
  postArtpiece(artpiece) {
    return fetch(`${config.API_ENDPOINT}/artwork`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(artpiece),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })

  },

  deleteGallery(galleryId) {
    return fetch(`${config.API_ENDPOINT}/galleries/${galleryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
     
    })
      .then(res => {
        if (!res.ok)          
          return res.json().then(e => Promise.reject(e))       
        // return res.json()
      })

  },

  deleteArtpiece(artpieceId) {
    return fetch(`${config.API_ENDPOINT}/artwork/${artpieceId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
     
    })
      .then(res => {
        if (!res.ok)          
          return res.json().then(e => Promise.reject(e))       
        // return res.json()
      })

  },

      
  
  
}

export default ArtisteApiService;