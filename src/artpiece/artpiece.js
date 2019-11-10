import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './artpiece.css';
import ArtisteApiService from '../services/artisteApiService';
import { Card, CardHeader, CardContent, IconButton, CardActionArea, CardMedia} from '@material-ui/core';

class Artpiece extends React.Component {
  handleDelete = e => {
    e.preventDefault();
    ArtisteApiService.deleteArtpiece(this.props.id)
      .then(() => {
        this.props.deleteArtpiece(this.props.id);
        this.props.history.goBack();
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <div className="artpiece">
        <Card className= "artpiece-card">
    <CardHeader  title={<Link className="artpiece-title" to={`/gallery/${this.props.galleryId}/artpiece/${this.props.id}`}>{this.props.title}</Link>} subheader={this.props.artist}/>
    <CardMedia
        className="artpiece-image-thumbnail"
        image={this.props.image}
        title={this.props.title}/>
        <CardContent className="artpiece-content">      

            <p className="uploaded">
              {format(this.props.uploaded, 'MM/DD/YYYY')}
            </p>
        
        <IconButton className="fas fa-trash-alt"       
            aria-label="delete" 
            onClick={this.handleDelete} 
            >          
          </IconButton>
        {/* <button className="delete-button" onClick={this.handleDelete}>
          Remove
        </button> */}
        </CardContent>
        </Card>
      </div>
    );
  }
}

export default Artpiece;
