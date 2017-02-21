// @flow
/* global SyntheticEvent */
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Box from '../Box/Box';
import styles from './Image.css';

export default class Image extends Component {

  static propTypes = {
    alt: PropTypes.string.isRequired,
    children: PropTypes.node,
    color: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    sizes: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    width: PropTypes.number.isRequired,
  };

  state = {
    loaded: false,
  };

  componentDidMount() {
    if (this.img && this.img.complete) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ loaded: true });
    }
  }

  img: HTMLElement;
  props: {
    alt: string,
    children?: any,
    color: string,
    height: number,
    onError?: () => void,
    onLoad?: () => void,
    sizes?: string,
    src: string,
    srcSet?: {[key: string]: string},
    width: number,
  };

  handleLoad = () => {
    this.setState({ loaded: true });
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  handleError = () => {
    this.setState({ loaded: false });
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    const {
      alt,
      color,
      children,
      height,
      sizes,
      src,
      srcSet,
      width,
    } = this.props;
    const { loaded } = this.state;

    const img = (
      <img
        alt={alt}
        className={cx(styles.img, styles[loaded ? 'loaded' : 'pending'])}
        onError={this.handleError}
        onLoad={this.handleLoad}
        ref={(el) => { this.img = el; }}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
      />
    );

    if (loaded) {
      if (children) {
        return (
          <Box position="relative">
            <Box position="relative">{img}</Box>
            <Box position="absolute" top left bottom right overflow="hidden">
              {children}
            </Box>
          </Box>
        );
      }
      return img;
    }

    const aspect = (height / width) * 100;
    const style = {
      backgroundColor: color,
      paddingBottom: `${aspect}%`,
    };

    return (
      <Box
        dangerouslySetInlineStyle={{ __style: style }}
        fit
        position="relative"
      >
        {src ? img : null}
      </Box>
    );
  }
}
