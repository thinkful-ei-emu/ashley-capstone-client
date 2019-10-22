import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { CompactPicker } from 'react-color';
import './studio.css';
import ArtisteApiService from '../services/artisteApiService';

class Studio extends React.Component {
  state = {
    color: '',
    brushSize: 10,
    error: null,
    lazyRadius: 0,
  };
  //change lazy radius formatting and to a toggle button(on/off)
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    let canvas = document
      .querySelector('#studio-form canvas:nth-of-type(2)')
      .toDataURL();
    const artpiece = {
      title: e.target['art-title'].value,
      gallery_id: e.target['art-gallery-id'].value,
      artpiece_image: canvas
    };
    if (this.props.galleries.length === 0) {
      this.setState({
        error:
          'Your galleries are empty. Please create a gallery to add your artwork.'
      });
    } else {
      ArtisteApiService.postArtpiece(artpiece)
        .then(artpiece => {
          this.props.addArt(artpiece);
        })
        .catch(error => {
          console.error({ error });
        });

      e.target['art-title'].value = '';
      e.target['art-gallery-select'].value = null;
      this.saveableCanvas.clear();
    }
  };

  onChangeComplete = (color, event) => {
    this.updateColor(color.hex);
  };

  clearArt = e => {
    e.preventDefault();
    this.saveableCanvas.clear();
  };
  undoArt = e => {
    e.preventDefault();
    this.saveableCanvas.undo();
  };

  adjustBrushSize = e => {
    e.preventDefault();
    this.updateBrushSize(parseInt(e.target.value, 10));
  };
  updateColor = color => {
    this.setState({
      color: color
    });
  };

  adjustRadiusSize = e => {
    e.preventDefault();
    this.updateLazyRadius(parseInt(e.target.value, 0));
  }

  updateLazyRadius = lazyRadius => {
    this.setState({
      lazyRadius: lazyRadius
    })
  }

  updateBrushSize = brushSize => {
    this.setState({
      brushSize: brushSize
    });
  };

  render() {
    const { color, brushSize, error, lazyRadius } = this.state;
    const { galleries } = this.props;

    return (
      <div className="studio">
        <h1 className="studio-header">L'Studio</h1>

        <div className="error-message-studio" role="alert">
          {error && <p id="error-studio-message">{error}</p>}
        </div>
        <form id="studio-form" onSubmit={this.handleSubmit}>
          <div className="flex-container">
            <div className="color-picker-container">
              <CompactPicker onChangeComplete={this.onChangeComplete} />
            </div>
            <div className="brush-size-container">
              <label
                htmlFor="brush-size"
                aria-label="brush-size"
                className="brush-label"
              >
                <i className="fas fa-paint-brush" />
              </label>
              <input
                id="brush-size"
                type="range"
                name="brush-size"
                onChange={this.adjustBrushSize}
                defaultValue={'10'}
                min="1"
                max="100"
              />
            </div>
            <div className="lazyRadius-container">
              <label>Lazy Radius:</label>
            <input
                id="lazy-radius"
                type="range"
                name="lazy-radius"
                onChange={this.adjustRadiusSize}
                defaultValue={'0'}
                min="0"
                max="18"
              />
            </div>
            <div className="title-container">
              <label htmlFor="art-title-input" className="title-label">
                Title:
              </label>
              <input
                type="text"
                name="art-title"
                id="art-title-input"
                required
              />
            </div>
            <div className="gallery-select-container">
              <label htmlFor="art-gallery-select" className="select-label">
                Save to Gallery:
              </label>
              <br />
              <select id="art-gallery-select" name="art-gallery-id">
                {galleries.map(gallery => (
                  <option key={gallery.id} value={gallery.id}>
                    {gallery.name}
                  </option>
                ))}
              </select>
            </div>           
          </div>

          <CanvasDraw
            name="drawing-canvas"
            aria-label="drawing canvas"
            brushRadius={brushSize}
            canvasWidth={750}
            canvasHeight={550}
            className="saved-canvas"
            hideGrid={true}
            lazyRadius={lazyRadius}
            brushColor={color}
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          />

          <div>
            <button
              className="tool-button"
              type="button"
              onClick={this.clearArt}
            >
              Clear
            </button>
            <button
              className="tool-button"
              type="button"
              onClick={this.undoArt}
            >
              Undo
            </button>
          </div>
          <br />
          <button className="add-button" type="submit">
            Add Artwork
          </button>
        </form>
      </div>
    );
  }
}

export default Studio;
