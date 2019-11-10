import React from 'react';
import { Link } from 'react-router-dom';
import '../gallery/gallery.css';
import ArtisteApiService from '../services/artisteApiService';
import { Card, CardHeader, CardContent, IconButton, CardActionArea, CardMedia} from '@material-ui/core';

class Gallery extends React.Component {

  handleDelete = e => {
    e.preventDefault();
  
    // ArtisteApiService.deleteGallery(this.props.id)
    //   .then(() => {
    //     this.props.deleteGallery(this.props.id);
    //     this.props.history.push('/gallery/:galleryId');
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //   });
  };

  render() {  
    console.log(this.props.artwork[0])
    return (
      <div className="gallery">
 
        <Card className="gallery-card">
         
        <CardHeader title={<Link className="name" to={`/gallery/${this.props.id}`}>{this.props.name}</Link>} subheader={this.props.owner}/>
      
        <CardMedia
        className="artpiece-thumbnail"
        //need to add conditional for if no artwork in gallery
        image={this.props.artwork[0].artpieceImage}
        title={this.props.artwork[0].artpieceTitle}/>
        <CardContent className="gallery-content">
        <p className="total-artwork">Artwork: {this.props.artwork.length}</p>
              
        <IconButton className="fas fa-trash-alt"       
            aria-label="delete" 
            onClick={this.handleDelete} 
            >          
          </IconButton>
        
        </CardContent>
       
        </Card>
      </div>
    );
  }
}

export default Gallery;
