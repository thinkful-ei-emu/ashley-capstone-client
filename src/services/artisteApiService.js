import config from '../config';
import TokenService from './tokenService';

const ArtisteApiService = {
  getGalAndArt() {
    return Promise.all([
      fetch(`${config.API_ENDPOINT}/galleries`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/artwork`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      })
    ]).then(([galleriesRes, artworkRes]) => {
      if (!galleriesRes.ok)
        return galleriesRes.json().then(e => Promise.reject(e));
      if (!artworkRes.ok) return artworkRes.json().then(e => Promise.reject(e));

      return Promise.all([galleriesRes.json(), artworkRes.json()]);
    });
  },
  getPrivateGalleries(){
    return fetch(`${config.API_ENDPOINT}/galleries-artwork/private/galleries`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
       if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
    })
  },
  getPrivateGallery(galleryId){
    return fetch(`${config.API_ENDPOINT}/galleries-artwork/private/galleries/${galleryId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
       if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
    })
  },
  postGallery(gallery) {
    return fetch(`${config.API_ENDPOINT}/galleries`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(gallery)
    }).then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e));
      return res.json();
    });
  },
  postArtpiece(artpiece) {
    return fetch(`${config.API_ENDPOINT}/artwork`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(artpiece)
    }).then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e));
      return res.json();
    });
  },

  deleteGallery(galleryId) {
    return fetch(`${config.API_ENDPOINT}/galleries/${galleryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e));
    });
  },

  deleteArtpiece(artpieceId) {
    return fetch(`${config.API_ENDPOINT}/artwork/${artpieceId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e));
    });
  }
};

export default ArtisteApiService;
